import { IdDto } from "../dtos/auth/id.dto"
import { RegisterUserDto } from "../dtos/auth/register-user.dto"
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface DeleteUserUsecase {
	execute(id: IdDto): Promise<void> 
}

export class DeleteUser implements DeleteUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}
	async execute(id: IdDto): Promise<void> {
		return await this.authRepository.deleteUser(id)
	}
}
