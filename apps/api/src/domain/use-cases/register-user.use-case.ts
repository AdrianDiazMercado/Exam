import { RegisterUserDto } from "../dtos/auth/register-user.dto"
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface RegistrarUserUsecase {
	execute(registerUserDto: RegisterUserDto): Promise<void> 
}

export class RegistarUser implements RegistrarUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}
	async execute(registerUserDto: RegisterUserDto): Promise<void> {
		return await this.authRepository.register(registerUserDto)
	}

}
