import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthTokenModule } from '../auth/token/auth-token.module';

@Module({
    imports: [AuthTokenModule],
    providers: [FileService],
    exports:[FileService]
})
export class FileModule { }