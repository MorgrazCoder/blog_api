import { BadRequestException, Injectable } from '@nestjs/common';
import { resolve } from "path";
import { sha256 } from 'js-sha256';
import { writeFile } from 'fs';
import blogModel from 'models/blogs.model';
import rimraf from "rimraf"
import { FileNewDto } from './dto/file-new.dto';
import fs from 'fs';

@Injectable()
export class FileService {
    async fileCreate(files: Array<Express.Multer.File>, blog_id: string) {
        try {
            if (!files.length || !blog_id || !await blogModel.findOne({ _id:blog_id } )) {
                throw new BadRequestException("Отсутствуют данные");
            }
            files.forEach(async file => {
                const file_name = await this.createFileName(file.originalname.split('.').pop());
                const file_path = await this.createPathForSave("source", file_name);
                const file_buffer = file.buffer;
                const newFile = new FileNewDto(file_name, file_path, file_buffer);

                await this.writeFileLocal(newFile)
                const data = await blogModel.findOne({_id:blog_id});
                data.media=[];
                data.media.push(file_path);
                await data.save();
            })
        } catch (error) {
            throw error;
        }
    }

    async fileRemove(file_path: any[]) {
        try {
            if(!file_path.length){
                throw new BadRequestException("Ошибка удаления данных")
            }
            file_path.forEach(file=>{
                rimraf(file)
            })
        } catch (error) {
            throw error;
        }
    }

    async createFileName(format: string) {
        try {
            const formats = ["jpg", "jpeg", "png"];
            if (!formats.includes(format)) {
                throw new BadRequestException("Ошибка формата, разрешены только .jpg и .png")
            }
            return sha256(Date.now().toString()) + `.${format}`;
        } catch (error) {
            throw error;
        }

    }

    async createPathForSave(foulder: string, file_name: string) {
        try {
            if (!foulder || !file_name) {
                throw new BadRequestException("Ошибка создания пути файла")
            }
            return resolve(process.cwd(), foulder, file_name);
        } catch (error) {
            throw error;
        }

    }

    async writeFileLocal(file: FileNewDto) {
        try {
            if (!file) {
                throw new BadRequestException("Отсутствуют данные")
            }
            writeFile(file.file_path, file.file_buffer, (err) => {
                if (err) { throw err }
            });
            return file;
        } catch (error) {
            throw error;
        }
    }

    // async onTextBlockUpdate(dto:FileDto,files: Array<Express.Multer.File>) {
    //     try {
    //         await this.removeFileInDb(dto).then(async filePath=>{
    //             await this.removeFileLocal(filePath);
    //         })
    //         await this.fileCreate(files,dto)
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // async onTextBlockGet(block_id:number){
    //     try {
    //         return await File.findAll({where:{essence_id:block_id},attributes:["id","file_path","essence_id"]})
    //     } catch (error) {
    //         throw error;
    //     }
    // }
}