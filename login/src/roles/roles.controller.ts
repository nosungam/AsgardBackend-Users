import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './DTO/createRole.dto';

@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}
    @Post()
    create(@Body() body: CreateRoleDto) {
        return this.rolesService.create(body);
    }
    @Get()
    findAll() {
        return this.rolesService.findAll();
    }
    @Put(':id')
    update(@Body() body: CreateRoleDto, @Param('id') id: number){
        return this.rolesService.update(body, id);
    }
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.rolesService.delete(id);
    }
    @Post(':id/permissions')
    addPermission(@Param('id') id: number, @Body('permissionId') permissionId: number){
        return this.rolesService.addPermission(id, permissionId);
    }
}
