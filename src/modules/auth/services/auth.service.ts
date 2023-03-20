import {Injectable} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {PayloadAccessToken} from "../types/types";

@Injectable()
export class AuthService {
    constructor(private JwtService: JwtService) {}

    public generateAccessToken(payload: PayloadAccessToken): string {
        return this.JwtService.sign(payload)
    }

}
