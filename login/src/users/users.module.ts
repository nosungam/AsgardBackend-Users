import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entities';
import { UserToPermission } from '../entities/userToPermission.entities';
import { UserToRole } from '../entities/userToRole.entities';

@Module({
  imports:[TypeOrmModule.forFeature([User, UserToRole, UserToPermission])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
