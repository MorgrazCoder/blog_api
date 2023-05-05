import { JwtModule } from '@nestjs/jwt';
import { AuthTokenController } from './auth-token.controller';
import { AuthTokenService } from './auth-token.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [JwtModule.register({})],
    controllers: [
        AuthTokenController,],
    providers: [
        AuthTokenService,],
    exports:[AuthTokenService]
})
export class AuthTokenModule { }