import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserToPermission } from "./userToPermission.entities";
import { UserToRole } from "./userToRole.entities";


@Entity()
export class User {
  
    @PrimaryGeneratedColumn()
    id: number;
   
    @Column()
    email: string;
    
    @Column()
    name: string;
    
    @Column()
    password: string;
    
    @OneToMany(() => UserToRole, userToRole => userToRole.user)
    userToRole: UserToRole[];

    @OneToMany(() => UserToPermission, userToPermission => userToPermission.user)
    userToPermission: UserToPermission[];
}