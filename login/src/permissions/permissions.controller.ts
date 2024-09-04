import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './DTO/createPermission.dto';

@Controller('permissions')
export class PermissionsController {
    constructor(private permissionsService: PermissionsService) {}
    @Post()
    create(@Body() body: CreatePermissionDto) {
        return this.permissionsService.create(body);
    }
    @Get()
    findAll() {
        return this.permissionsService.findAll();
    }
    @Put(':id')
    update(@Body() body: CreatePermissionDto,@Param('id') id: number){
        return this.permissionsService.update(body,id);
    }
    @Delete(':id')
    delete(@Param('id') id: number){
        return this.permissionsService.delete(id);
    }
}
