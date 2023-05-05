import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRegDto } from './dto/user.registration.dto';
import { sha256 } from 'js-sha256';
import usersModel from 'models/users.model';

@Injectable()
export class RegService {
    constructor(
    ) { }

    async userRegistration(dto: UserRegDto): Promise<Object> { //реегистрация пользователя
        const { user_email, user_password, user_name } = dto;
        try {
            if (await usersModel.findOne({ email: user_email }) || await usersModel.findOne({ name: user_name })) {
                throw new BadRequestException("Пользователь с текущим email или nickName уже зарегистрирован");
            }
            const newUser = await usersModel.create({ email: user_email, password: sha256(user_password), name: user_name })
            return newUser;
        } catch (error) {
            throw error;
        }
    }

}
