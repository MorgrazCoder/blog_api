import { BadRequestException, Injectable} from '@nestjs/common';
import { UserAuthDto } from './dto/user.authorization.dto';
import usersModel from 'models/users.model';
import { sha256 } from 'js-sha256';
import { AuthTokenService } from '../token/auth-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService:AuthTokenService
  ){}
  async userLogin(dto: UserAuthDto) {
    try {
      const person = await usersModel.findOne({email: dto.user_email })
      
      if (!person){
        throw new BadRequestException("Пользователь не найден")
      }
      if(sha256(dto.user_password)!==person.password){
        throw new BadRequestException("Пароль не верный") 
      }
      const {_id} = person;
      const tokens = await this.tokenService.tokensGenerate({user_id:_id});
      
      await this.tokenService.tokenSave(_id,tokens.refreshToken);
      return tokens;
      
    } catch (error) {
      throw error;
    }
  }

  async userLogout(refresh_token:string){
    return this.tokenService.tokenRemove(refresh_token);
  }

}