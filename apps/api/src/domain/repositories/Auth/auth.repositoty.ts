import { SearchDto } from "src/domain/dtos/search-user.dto";
import { IdDto } from "../../dtos/auth/id.dto";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { UpdateUserDto } from "../../dtos/auth/update-user.dto";
import { UserEntity } from "../../entities/user.entity";
import { LoginUserDto } from "src/domain/dtos/auth/login-user.dto";
import { ClientEntity } from "src/domain/entities/client.entity";

// Reglas de negocio
export abstract class AuthRepository {
  //Login
  abstract postLoginUser(loginUserDto: LoginUserDto): Promise<ClientEntity>;
  //Eliminar
  abstract deleteUser(id: IdDto): Promise<void>;
  // Leer
  abstract getUser(id: IdDto): Promise<UserEntity>;
  // Crear
  abstract register(registerUserDto: RegisterUserDto): Promise<void>;
  // Modificar
  abstract updateUser(id: IdDto, updateUserDto: UpdateUserDto): Promise<void>;
  // ObterUsuarios
  abstract postAllUser(search: SearchDto): Promise<UserEntity[]>;
}
