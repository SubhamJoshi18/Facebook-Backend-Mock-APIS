import { Column,Entity,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./user.entity";



@Entity(
    {
        name : 'UserProfile'
    }
)
export class UserProfile {


    @PrimaryGeneratedColumn({type : 'bigint'})
    userProfileId !: number


    @Column({
        type : 'text',
        nullable : false,
        default : ''
    })
    secondaryEmail !: string


     @OneToOne(() => Users, (users) => users.userProfile)
     user !: Users
}

