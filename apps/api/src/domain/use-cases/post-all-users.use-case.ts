import { IdDto } from "../dtos/auth/id.dto"
import { RegisterUserDto } from "../dtos/auth/register-user.dto"
import { SearchDto } from "../dtos/search-user.dto"
import { UserEntity } from "../entities/user.entity"
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface PostAllUserUsecase {
	execute(search:SearchDto): Promise<UserEntity[]> 
}

export class PostAllUser implements PostAllUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}
	async execute(search:SearchDto): Promise<UserEntity[]> {
		const result =  await this.authRepository.postAllUser(search);
		return result.map(r => ({
			domicilio: r.domicilio,
			email: r.email,
			id: r.id,
			nombres: r.nombres,
			primerApellido: r.primerApellido,
			segundoApellido: r.segundoApellido,
			lat: r.lat,
			lng: r.lng
		}))
	}
}
