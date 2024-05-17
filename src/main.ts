import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as passport from 'passport';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  await app.listen(3000);
}
bootstrap();
