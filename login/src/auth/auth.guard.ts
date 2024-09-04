import { HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET } from '../consts/token';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToPermission } from 'src/entities/userToPermission.entities';

@Injectable()
export class AuthGuard {
    constructor(
        private jwtService: JwtService,
        @InjectRepository(UserToPermission) private userPermissionsPermissionRepository: Repository<UserToPermission>
    ) {}

    async validatePersmission(request: string, permissionId: number) {
        const user = await this.validateUser(request); 
        const findUserPermissions = await this.userPermissionsPermissionRepository.find({where: {userId: user.id} }); 
        if (!findUserPermissions) { 
            throw new NotFoundException('User not found or has no permissions'); 
        }
        const result = findUserPermissions.filter((userPermission) => { 
            console.log(typeof userPermission.permissionId, userPermission.permissionId,typeof permissionId, permissionId, parseInt(`${permissionId}`) === userPermission.permissionId)
            if (parseInt(`${permissionId}`) === userPermission.permissionId) {
                return 1
            }
        })
        return result.length === 0 ? new UnauthorizedException('Permission denied') : HttpStatus.OK; 
    }

    async validateUser(request: string) {
        const token = this.extractTokenFromHeaders(request);
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }
        try {
            const user = await this.jwtService.verify(token, { secret: ACCESS_TOKEN_SECRET });
            return user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
    extractTokenFromHeaders(request: string) {
        const [type, token] = request.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
