import { IdDto } from "../dtos/auth/id.dto"
import { RegisterUserDto } from "../dtos/auth/register-user.dto"
import { UpdateUserDto } from "../dtos/auth/update-user.dto"
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface UpdateUserUserUsecase {
	execute(id: IdDto, updateUserDto: UpdateUserDto): Promise<void> 
}
export class UpdateUser implements UpdateUserUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}
	async execute(id: IdDto, updateUserDto: UpdateUserDto): Promise<void> {
		return await this.authRepository.updateUser(id, updateUserDto)
	}
}
