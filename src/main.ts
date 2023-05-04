import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const APP_PORT = process.env.APPLICATION_PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT);
  console.log(`Server has been started on port ${APP_PORT}`)
}
bootstrap();
