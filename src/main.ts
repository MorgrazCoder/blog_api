import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  mongoose  from 'mongoose';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const APP_PORT = process.env.APPLICATION_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Blogs API')
    .setDescription('The blogs API description')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT);
  console.log(`Server has been started on port ${APP_PORT}`)
}

async function dbConnection() {
  const DB_URI = process.env.DB_URI;
  await mongoose.connect(DB_URI);
  console.log("MongoDB connection to cluster 'glogApi' was successful");
}
bootstrap();
dbConnection();
