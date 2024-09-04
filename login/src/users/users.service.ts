import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { In, Repository } from 'typeorm';
import { CreteUserDto } from './DTO/createUser.dto';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { hash, genSalt } from 'bcrypt';
import { UserToPermission } from 'src/entities/userToPermission.entities';
import { UserToRole } from 'src/entities/userToRole.entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(UserToRole) private userToRoleRepository:Repository<UserToRole>,
        @InjectRepository(UserToPermission) private userToPermissionRepository:Repository<UserToPermission>
    ) {}
    async create(body: CreteUserDto) {
        const { email, password, name } = body;
        const hashedPassword = await this.hashPassword(password);
        
        return await this.userRepository.save({email:email, password:hashedPassword, name:name});
    }
    async hashPassword(password) {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }
    async findAll() {
        const usuarios = await this.userRepository.find();
        const data = usuarios.map(usuario=>{return {email: usuario.email, name: usuario.name}});
        return data;
    }
    update(body: UpdateUserDto, id: number) {
        return this.userRepository.update({id}, body);
    }
    delete(id: number) {
        return this.userRepository.delete({id});
    }
    addPermission(userId: number, permissionId: number) {
        return this.userToPermissionRepository.save({userId, permissionId});
    }
    addRole(userId: number, roleId: number) {
        return this.userToRoleRepository.save({userId, roleId});
    }
}
