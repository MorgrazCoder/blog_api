import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthTokenService } from './auth-token.service';
import {Request,Response} from 'express'
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('JWT authorization')
@Controller('auth/token')
export class AuthTokenController {
    constructor(
        private readonly tokenService:AuthTokenService
    ){}
    @ApiOperation({ summary: "Выполнит обновление пары jwt токенов" })
    @Get("/refresh")
    async refreshTokens(@Res({ passthrough: true }) response: Response,@Req() request:Request) {
        const {refresh_token} = request.cookies;
        const newTokens = await this.tokenService.tokensRefresh(refresh_token);
        response.cookie('refresh_token', newTokens.refreshToken, { httpOnly: true, maxAge: 60 * 1000 * 60 * 24 * 30 });
    }
}