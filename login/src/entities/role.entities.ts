import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entities";
import { UserToRole } from "./userToRole.entities";
import { RoleToPermission } from "./roleToPermission.entities";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description: string;
    @Column()
    code: string;
    
    @OneToMany(() => UserToRole, userToRole => userToRole.role)
    userToRole: UserToRole[];

    @OneToMany(() => RoleToPermission, roleToPermission => roleToPermission.role)
    roleToPermission: RoleToPermission[];
}