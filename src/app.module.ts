import { BlogModule } from './../modules/blog/blog.module';
import { BlogService } from './../modules/blog/blog.service';
import { BlogController } from '../modules/blog/blog.controller';
import { AuthModule } from '../modules/auth/authorization/auth.module';
import { RegModule } from '../modules/auth/registration/reg.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BlogModule,AuthModule,RegModule]
})
export class AppModule { }
