import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { Permission } from "./permission.entities";

@Entity({ name: 'user_to_permission'})
export class UserToPermission {
    @PrimaryGeneratedColumn()
    id: number; 
    @Column()
    userId: number;
    @Column()
    permissionId: number;
    @ManyToOne(() => User, user => user.userToPermission)
    user: User;
    @ManyToOne(() => Permission, permission => permission.userToPermission)
    permission: Permission;
}