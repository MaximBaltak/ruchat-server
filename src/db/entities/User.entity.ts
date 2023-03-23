import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column({name: 'user_name',nullable: false, length: 30})
    userName: string
    @Column({nullable: false})
    password: string
    @Column({nullable: false, unique: true})
    email: string
    @Column({name:'is_confirm_email',nullable: false, default: false})
    isConfirmEmail: boolean
    @Column({nullable: true})
    avatar: string
    @Column({name: 'refresh_token',nullable: false})
    refreshToken: string
    @CreateDateColumn({name: 'create_date'})
    createDate: Date
    @UpdateDateColumn({name:'update_date'})
    updateDate: Date
}
