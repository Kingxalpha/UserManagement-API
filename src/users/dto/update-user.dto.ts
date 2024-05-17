import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    fullname:string;

    @IsString()
    username:string;

    @IsString()
    @IsEmail()
    email:string;

}
