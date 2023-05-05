import { AuthTokenModule } from '../token/auth-token.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [AuthTokenModule],
    controllers: [
        AuthController,],
    providers: [
        AuthService,],
})
export class AuthModule { }
