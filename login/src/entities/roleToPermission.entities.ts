import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { Role } from "./role.entities";
import { Permission } from "./permission.entities";

@Entity()
export class RoleToPermission {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    roleId: number;
    @ManyToOne(() => Permission, permission => permission.roleToPermission)
    permission: Permission;
    @ManyToOne(() => Role, role => role.roleToPermission)
    role: Role;
}