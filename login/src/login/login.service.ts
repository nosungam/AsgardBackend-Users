import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './DTO/login.dto';
import { User } from 'src/entities/user.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../consts/token';


@Injectable()
export class LoginService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async login(body: LoginDto) {
        const { email, password } = body;
        const findUser = await this.userRepository.findOne({where: {email} });
        if (!findUser) {
            throw new NotFoundException('User not found');
        }
        let comparation:any = compare(password, findUser.password);
        comparation = await Promise.resolve(comparation);
        if (comparation ){
            const accessToken = this.generateAccessToken({id: findUser.id, email: findUser.email});
            const refreshToken = this.generateRefreshToken({id: findUser.id, email: findUser.email});
            return {accessToken, refreshToken};
        } else {
            throw new UnauthorizedException('Invalid password')
        }
    }
    
    generateAccessToken(user) {
        
      
        return sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      }
      
    generateRefreshToken(user) {
        return sign(user, REFRESH_TOKEN_SECRET);
      }
}

