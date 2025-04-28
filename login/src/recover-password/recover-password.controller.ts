import { Body, Controller, Param, Post } from '@nestjs/common';
import { RecoverPasswordService } from './recover-password.service';

@Controller('recover-password')
export class RecoverPasswordController {
    constructor(private recoverPasswordService:RecoverPasswordService) {}

    @Post()
    async recoverPassword(@Body() body: {email: string }) {
        return this.recoverPasswordService.recoverPassword(body.email);
    }

    @Post('reset/:token')
    async resetPassword(@Body() body: {password: string}, @Param('token') token: string) {
        return this.recoverPasswordService.resetPassword(body.password, token);
    }
}
