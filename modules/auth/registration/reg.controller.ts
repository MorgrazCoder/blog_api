import { Controller, Post, Res, Req } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { RegService } from './reg.service';
import { UserRegDto } from './dto/user.registration.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Regisration')
@Controller('auth')
export class RegController {
    constructor(
        private readonly regService: RegService
    ) { }
    @ApiOperation({ summary: "Выполнит регистрацию" })
    @ApiParam({ name: "user_email", required: true, description: "user email" })
    @ApiParam({ name: "user_password", required: true, description: "user password" })
    @ApiParam({ name: "user_name", required: true, description: "user name" })
    @Post("/reg")
    async userRegistration(@Body(new ValidationPipe()) dto: UserRegDto): Promise<Object> {
        return this.regService.userRegistration(dto);
    }

}