import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { User } from 'src/entities/user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class RecoverPasswordService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly mailerService: MailerService,
        private readonly jwtService: JwtService,
    ) { }

    async recoverPassword(email: string) {
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new Error('User not found');
        }

        const token = this.jwtService.sign({ sub: user.id }, { expiresIn: '1h' });

        const resetLink = `http://localhost:4200/reset-password?token=${token}`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Password Recovery',
            html: `
                <p>Hello,</p>
                <p>Click the link below to reset your password:</p>
                <a href="${resetLink}">${resetLink}</a>
                <p>This link will expire in 1 hour.</p>
            `,
        });
        return { message: 'Recovery email sent' };
    }
    async resetPassword(password: string, token) {
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userRepository.findOne({ where: { id: payload.sub } });

            user.password = await hash(password, 10);
            await this.userRepository.save(user);

            return { message: 'Password updated succesfully' };
        } catch (e) {
            throw new UnauthorizedException('invalid token or expired token');
        }
    }
}
