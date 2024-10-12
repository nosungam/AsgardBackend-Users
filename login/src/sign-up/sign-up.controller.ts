import { Body, Controller, Post } from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import { CreteUserDto } from './Dto/createUser.dto';

@Controller('sign-up')
export class SignUpController {
    constructor(private signUpService: SignUpService) {}
    @Post()
    create(@Body() body: CreteUserDto){
        return this.signUpService.create(body);
    }
}
