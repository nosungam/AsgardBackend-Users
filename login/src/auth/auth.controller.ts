import { Controller, Get, Headers, Param } from '@nestjs/common';
import { AuthGuard } from './auth.guard';


@Controller('can-do')
export class AuthController {
    constructor(private authGuard: AuthGuard) {}

    @Get(':permissionId')
    async validatePersmission(@Headers() headers, @Param('permissionId') permissionId: number) {
        const request = headers['authorization'];
        return await this.authGuard.validatePersmission(request, permissionId);
    }
}
