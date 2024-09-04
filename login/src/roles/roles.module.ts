import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from 'src/entities/role.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleToPermission } from 'src/entities/roleToPermission.entities';

@Module({
  imports:[TypeOrmModule.forFeature([Role, RoleToPermission])],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
