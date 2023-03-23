import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwt.strategy";
import { AuthService } from './services/auth.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../../db/entities/User.entity";
import {FileModule} from "../file/file.module";
import {AuthController} from "./auth.controller";
import {FileService} from "../file/file.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([UserEntity]),
        PassportModule.register({
            session:false
        }),
        JwtModule.register({
            secret: process.env.JWT_ACCESS_SECRET,
            signOptions:{ expiresIn: process.env.JWT_ACCESS_TIME }
        }),
        FileModule
    ],
    providers:[JwtStrategy,AuthService,FileService],
    controllers: [AuthController],
    exports: [AuthService]
})
export class AuthModule {}
