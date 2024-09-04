import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserToPermission } from 'src/entities/userToPermission.entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserToPermission]) ],
  controllers: [AuthController],
  providers: [AuthGuard, JwtService]
})
export class AuthModule {}
