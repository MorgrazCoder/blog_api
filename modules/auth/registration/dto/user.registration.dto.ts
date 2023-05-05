import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsEmail,IsStrongPassword,Length } from 'class-validator';

export class UserRegDto {
    @IsEmail()
    @ApiProperty({ description: "user email", nullable: false })
    public readonly user_email: string;
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 9,
        minLowercase: 3,
        minUppercase: 3,
        minNumbers: 1,
        minSymbols: 0
    })
    @ApiProperty({ description: "user password", nullable: false })
    public readonly user_password: string;
    @Length(5,12)
    @ApiProperty({ description: "user name", nullable: false })
    public readonly user_name: string;
}
