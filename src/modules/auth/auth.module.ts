import { Module } from '@nestjs/common';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./strategy/jwt.strategy";
import { AuthService } from './services/auth.service';

@Module({
    imports:[
        PassportModule.register({
            session:false
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions:{ expiresIn: process.env.JWT_TIME }
        })
    ],
    providers:[JwtStrategy,AuthService],
    exports: [AuthService]
})
export class AuthModule {}
