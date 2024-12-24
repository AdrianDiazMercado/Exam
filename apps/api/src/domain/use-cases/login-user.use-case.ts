import { IdDto } from "../dtos/auth/id.dto"
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { ClientEntity } from "../entities/client.entity";
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface LoginUserUsecase {
	execute(loginUserDto: LoginUserDto): Promise<ClientEntity>
}

export class LoginUser implements LoginUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}

	async execute(loginUserDto: LoginUserDto): Promise<ClientEntity> {
		const {jwt}  = await this.authRepository.postLoginUser(loginUserDto);
		return{
			jwt
		}
	}
}
