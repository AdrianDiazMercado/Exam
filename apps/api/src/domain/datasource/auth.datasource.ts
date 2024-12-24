import { IdDto } from "../dtos/auth/id.dto";
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UpdateUserDto } from "../dtos/auth/update-user.dto";
import { SearchDto } from "../dtos/search-user.dto";
import { ClientEntity } from "../entities/client.entity";
import { UserEntity } from "../entities/user.entity";

// Reglas de negocio
export abstract class AuthDatasource{
	//Login
	abstract postLoginUser(loginUserDto: LoginUserDto): Promise<ClientEntity>
	//Eliminar
	abstract deleteUser(id: IdDto): Promise<void>;
	// Leer
	abstract getUser(id: IdDto):Promise<UserEntity>;
	// Crear
	abstract register(registerUserDto: RegisterUserDto): Promise<void>;
	// Modificar
	abstract updateUser(id: IdDto, updateUserDto: UpdateUserDto): Promise<void>;
	// ObterUsuarios
	abstract postAllUser(search: SearchDto): Promise<UserEntity[]>;
	
}