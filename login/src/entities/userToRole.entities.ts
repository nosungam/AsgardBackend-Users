import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entities";
import { Role } from "./role.entities";

@Entity()
export class UserToRole {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    userId: number;
    @Column()
    roleId: number;
    @ManyToOne(() => User, user => user.userToRole)
    user: User;
    @ManyToOne(() => Role, role => role.userToRole)
    role: Role;
}