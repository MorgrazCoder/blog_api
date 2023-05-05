import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { AuthTokenModule } from '../auth/token/auth-token.module';
import { FileModule } from 'modules/file/file.module';

@Module({
    imports: [AuthTokenModule,FileModule],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule { }