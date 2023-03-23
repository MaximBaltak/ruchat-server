export interface User {
    id: number,
    userName: string,
    avatar: string | null,
    isConfirmEmail: boolean
}

export class ResponseUserDto {
    user: User
    accessToken: string
    refreshToken: string
}
