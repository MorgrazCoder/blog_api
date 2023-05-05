import { Controller, Post, Res, Req } from '@nestjs/common';
import { Body, Get} from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user.authorization.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Response,Request } from 'express';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: "Выполнит авторизацию" })
    @ApiParam({ name: "user_email", required: true, description: "user email" })
    @ApiParam({ name: "user_password", required: true, description: "user password" })
    @Post("/login")
    async userLogin(@Res({ passthrough: true }) response: Response, @Body(new ValidationPipe()) dto: UserAuthDto) {
        const tokens = await this.authService.userLogin(dto);
        response.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 * 30 });
        return tokens;
    }

    @ApiOperation({ summary: "Выполнит логаут" })
    @Get("/logout")
    async userLogout(@Res({ passthrough: true }) response: Response,@Req() request:Request) {
        const {refresh_token} = request.cookies;
        await this.authService.userLogout(refresh_token);
        response.clearCookie('refresh_token');
    }

}