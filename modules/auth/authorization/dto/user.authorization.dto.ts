import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsEmail,IsStrongPassword } from 'class-validator';

export class UserAuthDto {
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
}
