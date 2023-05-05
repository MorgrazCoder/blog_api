import { IsEnum, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class FileNewDto {
    constructor(file_name:string,file_path:string,file_buffer:Buffer){
        this.file_name = file_name;
        this.file_path = file_path;
        this.file_buffer = file_buffer;
    }
    @IsNotEmpty()
    @IsString()
    public readonly file_name: string;
    @IsNotEmpty()
    @IsString()
    public readonly file_path: string;
    @IsNotEmpty()
    public readonly file_buffer: Buffer;
}