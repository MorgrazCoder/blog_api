import { RegController } from './reg.controller';
import { RegService } from './reg.service';

import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        RegController,],
    providers: [
        RegService,]
})
export class RegModule { }
