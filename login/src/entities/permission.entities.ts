import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { Role } from "./role.entities";
import { UserToPermission } from "./userToPermission.entities";
import { RoleToPermission } from "./roleToPermission.entities";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @OneToMany(() => UserToPermission, userToPermission => userToPermission.permission)
    userToPermission: UserToPermission[];

    @OneToMany(() => RoleToPermission, roleToPermission => roleToPermission.permission)
    roleToPermission: RoleToPermission[];
}