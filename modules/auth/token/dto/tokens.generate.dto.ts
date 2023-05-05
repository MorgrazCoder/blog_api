import { ApiProperty } from '@nestjs/swagger';
import { IsNumber,IsNotEmpty, IsString} from 'class-validator';

export class TokensGenerateDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ description: "user id", nullable: false })
    public readonly user_id: any;
}