import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;
    
    @IsEmail()
    email: string;
    
    @MinLength(6)
    password: string; 
}