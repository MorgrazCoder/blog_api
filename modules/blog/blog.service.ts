import { Injectable,BadRequestException } from '@nestjs/common';
import { BlogDto } from './dto/blog.dto';
import blogModel from 'models/blogs.model';
// import { FileDto } from 'modules/file/dto/file.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class BlogService {
    constructor(
        private readonly fileService:FileService
    ){}

    async blogCreate(user_id:any ,dto: BlogDto,files:Array<Express.Multer.File>) {
        try {
           if(!dto){
            throw new BadRequestException("Ошибка данных")
           }
           const newBlog = await blogModel.create({text:dto.blog_text,author_id:user_id,created_at:Date.now()});
           if(files){
            await this.fileService.fileCreate(files,newBlog.id)
           }
        } catch (error) {
            throw error;
        }
    }

    async blogRemove(blog_id:string) {
        const blogData = await blogModel.findOne({_id:blog_id});
        
        try {
            if(!blogData){
                throw new BadRequestException("Запись не найдена");
            }
            await blogModel.deleteOne({_id:blog_id});
            await this.fileService.fileRemove(blogData.media);
        } catch (error) {
            throw error
        }
    }

    async blogUpdate(blog_id:string,dto: BlogDto,files:Array<Express.Multer.File>) {
        try {
            const blogData = await blogModel.findOne({_id:blog_id});
            if(!blogData){
                throw new BadRequestException("Запись не найдена");
            }
            blogData.text = dto.blog_text;
            if(files.length){
                await this.fileService.fileRemove(blogData.media);
                await this.fileService.fileCreate(files,blog_id);
            }
            blogData.save();
        } catch (error) {
            throw error
        }
    }

    async blogsGet(pagination_id?:number) {
        try {
            if(pagination_id){
                return blogModel.find().skip(pagination_id*20).limit(20)
            }
            return await blogModel.find();
        } catch (error) {
            throw error;
        }
    }

}