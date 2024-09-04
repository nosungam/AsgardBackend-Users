import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/permission.entities';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './DTO/createPermission.dto';

@Injectable()
export class PermissionsService {
    constructor(@InjectRepository(Permission) private permissionRepository: Repository<Permission>) {}
    create(body: CreatePermissionDto) {
        return this.permissionRepository.save(body);
    }
    findAll() {
        return this.permissionRepository.find();
    }  
    update(body: CreatePermissionDto,id: number) {
        return this.permissionRepository.update({id},body);
    }
    delete(id: number) {
        return this.permissionRepository.delete({id});
    }
}
