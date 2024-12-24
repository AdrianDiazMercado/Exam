import { IdDto } from "../dtos/auth/id.dto"
import { UserEntity } from "../entities/user.entity"
import { AuthRepository } from "../repositories/Auth/auth.repositoty"

interface GetUserUsecase {
	execute(id: IdDto): Promise<UserEntity> 
}

export class GetUser implements GetUserUsecase{
		constructor(private readonly authRepository: AuthRepository ){}
	async execute(id: IdDto): Promise<UserEntity> {
		const{ domicilio,email,id:id_user,nombres,primerApellido,segundoApellido, lat, lng} =  await this.authRepository.getUser(id);
		return {
			domicilio,
			email,
			id: id_user,
			nombres,
			primerApellido,
			segundoApellido,
			lat,
			lng
		}
	}

}
