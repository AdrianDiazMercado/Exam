import { SearchDto } from "src/domain/dtos/search-user.dto";
import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import { IdDto } from "../../domain/dtos/auth/id.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import { AuthRepository } from "../../domain/repositories/Auth/auth.repositoty";
import { LoginUserDto } from "src/domain/dtos/auth/login-user.dto";
import { ClientEntity } from "src/domain/entities/client.entity";


export class AuthRepositoryImpl implements AuthRepository{
	constructor(private readonly authdatasource: AuthDatasource){}	

	postLoginUser(loginUserDto: LoginUserDto): Promise<ClientEntity> {
		return this.authdatasource.postLoginUser(loginUserDto)
	}
	
	deleteUser(id: IdDto): Promise<void> {
		return this.authdatasource.deleteUser(id);
	}
	getUser(id: IdDto): Promise<UserEntity> {
		return this.authdatasource.getUser(id);
	}
	register(registerUserDto: RegisterUserDto): Promise<void> {
		return this.authdatasource.register(registerUserDto);
	}
	updateUser(id: IdDto, updateUserDto: UpdateUserDto): Promise<void> {
		return this.authdatasource.updateUser(id, updateUserDto);
	}

	postAllUser(search: SearchDto): Promise<UserEntity[]> {
		return this.authdatasource.postAllUser(search)
	}
	
}