import {IsEmail, Length, Matches} from "class-validator";

export class CreateUserDto {
    @Length(1, 30)
    userName: string
    @Matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g)
    password: string
    @IsEmail()
    email: string
}
