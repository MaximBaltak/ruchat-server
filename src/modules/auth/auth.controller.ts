import {
    Body,
    Controller,
    Get, Header,
    HttpException, HttpStatus,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {fileAvatarFilter} from "../../utils/files/fileFilter";
import {CreateUserDto} from "./dto/CreateUser.dto";
import {Response} from "express";
import {ResponseUserDto} from "./dto/ResponseUser.dto";
import {AuthService} from "./services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}
    @Post('create')
    @UseInterceptors(FileInterceptor('file',{
        fileFilter: fileAvatarFilter
        }
    ))
   async createUser(@UploadedFile() file: Express.Multer.File | null,
               @Body(new ValidationPipe()) user: CreateUserDto,
               @Res() res: Response):Promise<void> {
        try {
            let result:ResponseUserDto
            if(file) result = await this.AuthService.registrationUser(user.userName, user.password, user.email, file)
            if(!file) result = await this.AuthService.registrationUser(user.userName, user.password, user.email)
            res.status(200).json(result)
        }catch (e) {
            res.status(400).json(new HttpException(e, HttpStatus.BAD_REQUEST))
        }

    }
}

