import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './DTO/updateUser.dto';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get()
    findAll() {
        return this.userService.findAll();
    }
    @Put(':id')
    update(@Body() body: UpdateUserDto, @Param('id') id: number) {
        return this.userService.update(body, id);
    }
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.userService.delete(id);
    }
    @Post(':id/permissions')
    addPermission(@Param('id') id: number, @Body('permissionId') permissionId: number) {
        return this.userService.addPermission(id, permissionId);
    }
    @Post(':id/roles')
    addRole(@Param('id') id: number, @Body('roleId') roleId: number) {
        return this.userService.addRole(id, roleId);
    }
}
