import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        private readonly usersService : UsersService,
        private readonly jwtService : JwtService
    ) {}

    // REGISTER NEW USER
    async register (registerDto : RegisterDto):Promise<any> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        const user = await this.usersService.create({...registerDto, password:hashedPassword});
        return {user, message:'registration successful'}
    }

    // LOGIN USER
async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (!user) {
        throw new HttpException('User not Found!!', 404);
    }

    const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordMatch) {
        throw new HttpException('Password doesn\'t match', 400);
    }

    const token = this.generateToken(user);
    return { user, token, message: 'Login successful' };
}

// GENERATE TOKEN AFTER LOGGING IN
private generateToken(user: any): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload, {secret:process.env.JWT_SECRET});
}

}
