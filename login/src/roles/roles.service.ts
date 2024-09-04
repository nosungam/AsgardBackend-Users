import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './DTO/createRole.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entities';
import { Repository } from 'typeorm';
import { RoleToPermission } from 'src/entities/roleToPermission.entities';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(RoleToPermission) private roleToPermissionRepository: Repository<RoleToPermission>    
    ) {}
    create(body: CreateRoleDto) {
        return this.roleRepository.save(body);
    }
    findAll() {
        return this.roleRepository.find();
    }
    update(body: CreateRoleDto, id: number) {
        return this.roleRepository.update({id}, body);
    }
    delete(id: number) {
        return this.roleRepository.delete({id});
    }
    addPermission(id: number, permissionId: number) {
        return this.roleToPermissionRepository.save({roleId: id, permissionId});
    }
}
