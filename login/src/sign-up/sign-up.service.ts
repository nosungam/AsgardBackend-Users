import { Injectable } from '@nestjs/common';
import { CreteUserDto } from './Dto/createUser.dto';
import { hash, genSalt } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class SignUpService {
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>
    ) {}
    async create(body: CreteUserDto) {
        const { email, password, name, surname} = body;

        if (this.userRepository.findOneBy({ email })) { throw new Error('User already exists'); }

        const hashedPassword = await this.hashPassword(password);
        return await this.userRepository.save({email:email, password:hashedPassword, name:name, surname:surname});
    }
    async hashPassword(password) {
        const salt = await genSalt(10);
        return await hash(password, salt);
    }
}
