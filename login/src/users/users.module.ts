import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { UserToRole } from 'src/entities/userToRole.entities';
import { UserToPermission } from 'src/entities/userToPermission.entities';

@Module({
  imports:[TypeOrmModule.forFeature([User, UserToRole, UserToPermission])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
