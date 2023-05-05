import { Controller, Get, Post, Patch, Delete, Headers, Param, UseInterceptors, BadRequestException, Body, ValidationPipe, UploadedFiles } from '@nestjs/common';
import { BlogService } from './blog.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthTokenService } from '../auth/token/auth-token.service';
import { BlogDto } from './dto/blog.dto';
import blogsModel from 'models/blogs.model';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller("blogs")
export class BlogController {
    constructor(
        private readonly blogService: BlogService,
        private readonly tokenService: AuthTokenService
    ) { }

    @Post()
    @ApiOperation({ summary: "Создание нового блога" })
    @ApiParam({ name: "blog_text", required: true, description: "text for new blog" })
    @UseInterceptors(FilesInterceptor('files', 20))
    async textBlockCreate(@Headers("Authorization") token: string, @UploadedFiles() files: Array<Express.Multer.File>, @Body(new ValidationPipe()) dto: BlogDto) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        if (!userData ) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.blogService.blogCreate(userData.user_id,dto,files)
    }

    @ApiOperation({ summary: "Создание блога по идентификатору" })
    @ApiParam({ name: "blog_id", required: true, description: "blog id" })
    @Delete(":blog_id")
    async blogRemove(@Headers("Authorization") token: string, @Param("blog_id") blog_id: string) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        const blogData = await blogsModel.findOne({_id:blog_id});
        if (!userData || blogData || (blogData.author_id!=userData.user_id)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.blogService.blogRemove(blog_id);
    }
    @ApiOperation({ summary: "Обновление блога по идентификатору" })
    @Patch(":blog_id")
    @ApiParam({ name: "blog_id", required: true, description: "blog id" })
    @UseInterceptors(FilesInterceptor('files', 20))
    async blogUpdate(@Headers("Authorization") token: string, @UploadedFiles() files: Array<Express.Multer.File>, @Param("blog_id") blog_id: string, @Body(new ValidationPipe()) dto: BlogDto) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        const userData = await this.tokenService.tokenAccessValidate(bearerToken);
        const blogData = await blogsModel.findOne({_id:blog_id});
        if (!userData || blogData || (blogData.author_id!=userData.user_id)) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.blogService.blogUpdate(blog_id, dto, files);
        
    }

    @ApiOperation({ summary: "Вернет все созданные блоги" })
    @Get()
    async blogsGet(@Headers("Authorization") token: string) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.blogService.blogsGet()
    }

    @ApiOperation({ summary: "Вернет блоги с пагинацией на 20" })
    @ApiParam({ name: "pagination_id", required: true, description: "number pagination of page" })
    @Get(":pagination_id")
    async paginationGet(@Headers("Authorization") token: string, @Param("pagination_id") paginaion_id: number) {
        const bearerToken = token.split(" ")[1];
        if (!bearerToken) {
            throw new BadRequestException("Ошибка авторизации");
        }
        return await this.blogService.blogsGet(paginaion_id)
    }

}