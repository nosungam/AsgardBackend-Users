import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { CreateUserDto } from './Dto/createUser.dto';

@Controller('sign-up')
export class SignUpController {
    constructor(private signUpService: SignUpService) {}
    @Post()
    create(@Body() body: CreateUserDto){
        return this.signUpService.create(body);
    }
}
