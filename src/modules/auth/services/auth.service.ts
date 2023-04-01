import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PayloadAccessToken, PayloadRefreshToken} from "../types/types";
import {FileService} from "../../file/file.service";
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "../../../db/entities/User.entity";
import {Repository} from "typeorm";
import {compareSync, hashSync} from 'bcrypt'
import {ResponseUserDto} from "../dto/ResponseUser.dto";
import {SavedFile} from "../../file/types/savedFile";

@Injectable()
export class AuthService {
    constructor(
        private JwtService: JwtService,
        private FileService: FileService,
        @InjectRepository(UserEntity) private UserRepository: Repository<UserEntity>
    ) {
    }

    /**
     * @private
     * @desc генерирует access_token
     * @param {PayloadAccessToken} payload - значение которые кодируются в токен
     * @return {string} access_token
     * */
    #generateAccessToken(payload: PayloadAccessToken): string {
        return this.JwtService.sign(payload)
    }

    /**
     * @private
     * @desc генерирует refresh_token
     * @param {PayloadRefreshToken} payload - значение которые кодируются в токен
     * @return {string} refresh_token
     * */
    #generateRefreshToken(payload: PayloadRefreshToken): string {
        return this.JwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_TIME
        })
    }

    /**
     * @private
     * @async
     * @desc проверяет на наличие пользователя в БД
     * @param {string} email - email пользователя
     * @return {Promise<boolean>} существует ли пользователь в БД
     * */
    async #checkUser(email: string): Promise<UserEntity> {
        return await this.UserRepository.findOneBy({email});

    }

    /**
     * @public
     * @async
     * @desc регестрирует пользователя в БД
     * @param {string} userName - имя пользователя
     * @param {string} password - пароль пользователя
     * @param {string} email - email пользователя
     * @param {Express.Multer.File} file - загруженная аватарка пользователя
     * @return {Promise<ResponseUserDto>} объект зарегестрированного пользователя и его токены
     * */
    public async registrationUser(userName: string,
                                  password: string, email: string,
                                  file: Express.Multer.File = null): Promise<ResponseUserDto> {
        const user: UserEntity = await this.#checkUser(email)
        if (user) throw new Error('Пользователь уже существует')

        const hashPassword: string = hashSync(password, 5)

        let savedFile: SavedFile | null = null
        if (file) savedFile = this.FileService.saveFile(file, userName)

        const refreshToken: string = this.#generateRefreshToken({createDateToken: new Date()})

        const newUser: UserEntity = new UserEntity()
        newUser.userName = userName
        newUser.password = hashPassword
        newUser.email = email
        newUser.avatar = savedFile ? savedFile.fileName : null
        newUser.refreshToken = refreshToken
        await this.UserRepository.save(newUser)

        const createdUser: UserEntity = await this.UserRepository.findOne(
            {
                select: ['id', 'userName', 'refreshToken', 'avatar', 'isConfirmEmail'],
                where: {
                    email
                }
            }
        )
        const accessToken: string = this.#generateAccessToken({
            id: createdUser.id,
            email: createdUser.email
        })
        return {
            user: {
                id: createdUser.id,
                userName: createdUser.userName,
                isConfirmEmail: createdUser.isConfirmEmail,
                avatar: createdUser.avatar ? `${process.env.APP_SERVER_URL}/file/${createdUser.avatar}` : null
            },
            accessToken,
            refreshToken: createdUser.refreshToken
        }
    }

    /**
     * @public
     * @async
     * @desc Получает пользователя из в БД
     * @param {string} password - пароль пользователя
     * @param {string} email - email пользователя
     * @return {Promise<ResponseUserDto>} объект авторизованного пользователя и его токены
     * */
    public async loginUser(password: string, email: string): Promise<ResponseUserDto> {
        const user: UserEntity = await this.#checkUser(email)
        if (!user) throw new Error('Такого пользователя не существует')
        if (!compareSync(password, user.password)) throw new Error('Такого пользователя не существует')

        const refreshToken: string = this.#generateRefreshToken({createDateToken: new Date()})
        const accessToken: string = this.#generateAccessToken({
            id: user.id,
            email: user.email
        })
        await this.UserRepository.update({id: user.id}, {refreshToken})
        return {
            user: {
                id: user.id,
                userName: user.userName,
                isConfirmEmail: user.isConfirmEmail,
                avatar: user.avatar ? `${process.env.APP_SERVER_URL}/file/${user.avatar}` : null
            },
            accessToken,
            refreshToken
        }
    }
}
