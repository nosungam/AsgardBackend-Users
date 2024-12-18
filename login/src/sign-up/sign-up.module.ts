import { Module } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { SignUpController } from './sign-up.controller';

@Module({
  providers: [SignUpService],
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [SignUpController],
  exports: [SignUpService]
})
export class SignUpModule {}
