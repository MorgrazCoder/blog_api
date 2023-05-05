import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';

export class BlogDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "text for new blog", nullable: false })
    public readonly blog_text: string;
}