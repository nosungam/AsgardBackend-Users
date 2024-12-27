import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './DTO/login.dto';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) {}
    @Post()
    login(@Body() body: LoginDto) {
        return this.loginService.login(body);
    }

    @Put()
    hashPassword(@Body() body: LoginDto) {
        return this.loginService.hashPassword(body);
    }

    @Get()
    getHash() {
        return this.loginService.getHash();
    }
}
