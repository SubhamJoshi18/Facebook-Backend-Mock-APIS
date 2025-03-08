import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserProfile } from "./userProfile.entity";




@Entity({
    name : "Users"
})
export class Users {

    @PrimaryGeneratedColumn({
        type : 'bigint',
    })
    userId !: number


    @Column(
        {
            type : 'text',
            nullable : false
        }
    )
    email !: string


    @Column(
        {
            type : 'text',
            nullable : false
        }
    )
    password !: string


    @Column(
        {
            type : 'text',
            nullable : false
        }
    )
    username !: string


    @Column(
        {
            type : 'boolean',
            default : true
        }
    )
    isActive !: boolean


    @OneToOne(() => UserProfile, (userProfile) => userProfile.user)
    @JoinColumn()
    userProfile !: UserProfile
}