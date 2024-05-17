import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService ) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15min' },
      }),
      inject:[ConfigService]
    }),
    ConfigModule.forRoot({isGlobal:true})
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtService],
  exports:[AuthService]
})
export class AuthModule {}
