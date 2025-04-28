import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/createUser.dto';
import { hash, genSalt } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class SignUpService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ) {}
    async create(body: CreateUserDto) {
        const { email, password, username} = body;

        if (await this.userRepository.findOneBy({ email })) { throw new Error('User already exists'); }

        const hashedPassword = await this.hashPassword(password);
        return await this.userRepository.save({email:email, password:hashedPassword, username});
    }
    async hashPassword(password) {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }
}
