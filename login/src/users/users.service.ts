import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './DTO/updateUser.dto';
import { User } from '../entities/user.entities';
import { UserToPermission } from '../entities/userToPermission.entities';
import { UserToRole } from '../entities/userToRole.entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(UserToRole) private userToRoleRepository:Repository<UserToRole>,
        @InjectRepository(UserToPermission) private userToPermissionRepository:Repository<UserToPermission>
    ) {}
    
    async findUserByEmail(email: string) {
        try{
            const usuario = await this.userRepository.findOneBy({email});
            return {
                name: usuario.name, 
                id: usuario.id
            };
        }
        catch(e){
            throw e;
        }
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

    findAll() {
        return this.userRepository.find();
    }
}
