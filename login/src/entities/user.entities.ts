import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserToPermission } from "./userToPermission.entities";
import { UserToRole } from "./userToRole.entities";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    username: string;

    @Column({nullable: true, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"})
    img: string;
    
    @Column()
    password: string;

    @OneToMany(() => UserToRole, userToRole => userToRole.user)
    userToRole: UserToRole[];

    @OneToMany(() => UserToPermission, userToPermission => userToPermission.user)
    userToPermission: UserToPermission[];
}