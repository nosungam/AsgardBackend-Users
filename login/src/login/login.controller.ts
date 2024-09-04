import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './DTO/login.dto';

@Controller('login')
export class LoginController {
    constructor(private loginService: LoginService) {}
    @Post()
    login(@Body() body: LoginDto) {
        return this.loginService.login(body);
    }
}
