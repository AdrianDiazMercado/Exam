import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import { IdDto } from "../../domain/dtos/auth/id.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import User from "../../postgresql/models/user.model";
import Client from "src/postgresql/models/client.model";
import { CustomError } from "../../domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";
import { SearchDto } from "src/domain/dtos/search-user.dto";
import { Op, Sequelize } from "sequelize";
import { LoginUserDto } from "src/domain/dtos/auth/login-user.dto";
import { ClientEntity } from "src/domain/entities/client.entity";
import { EncryptAdapter } from "src/config/bcrypt";
import { JwtAdapter } from "src/config/jwt.adapter";
import { ClientMapper } from "../mappers/client.mapper";
import { CustomJson } from "src/config/custom-json";

//Creacion de "type" para eliminar la dependencia oculta
type CompareFunction = (password: string, hashDb: string) => Promise<boolean>;
type JwtFunction = (
  payload: object,
  duration: string
) => Promise<string | null>;

export class AuthDatasourceImpl implements AuthDatasource {
  constructor(
    private readonly compare: CompareFunction = EncryptAdapter.compare,
    private readonly generateToken: JwtFunction = JwtAdapter.generateToken
  ) {}

  async postLoginUser(loginUserDto: LoginUserDto): Promise<ClientEntity> {
    const { email, password } = loginUserDto;
    try {
      const user = await Client.findOne({
        where: {
          txt_email: email,
        },
      });

      if (!user) throw CustomError.notFound("Usuario no encontrado");
      const isMatching = await this.compare(
        password,
        user.dataValues.txt_password
      );
      if (!isMatching) throw CustomError.badRequest("Credenciales incorrectas");
      const { id, txt_nombre } = user.dataValues;
      const txt_token = await this.generateToken({ id, txt_nombre}, "8h");
      return ClientMapper.clientEntityFromObject({ txt_token });
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError();
    }
  }
  async deleteUser(id: IdDto): Promise<void> {
    try {
      const userDelete = await User.findByPk(id.id);
      if (!userDelete) throw CustomError.notFound("User not found");
      await User.destroy({
        where: {
          id: id.id,
        },
      });
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError();
    }
  }

  async getUser(id: IdDto): Promise<UserEntity> {
    const result = await User.findByPk(id.id);
    if (!result) throw CustomError.notFound("User not found");
    return UserMapper.userEntityFromObject(result);
  }

  async register(registerUserDto: RegisterUserDto): Promise<void> {
    const {
      domicilio,
      email,
      nombres,
      primerApellido,
      segundoApellido,
      lat,
      lng,
    } = registerUserDto;

    const emailEqueal = await User.findOne({
      where: {
        txt_email: email,
      },
    });

    if (emailEqueal) throw CustomJson.response("Email already exists");

    try {
      await User.create({
        txt_nombres: nombres,
        txt_domicilio: domicilio,
        txt_email: email,
        txt_primer_apellido: primerApellido,
        txt_segundo_apellido: segundoApellido,
        txt_lat: lat,
        txt_lng: lng,
      });
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError();
    }
  }

  async updateUser(id: IdDto, updateUserDto: UpdateUserDto): Promise<void> {
    const { id: userId } = id;
    const {
      domicilio,
      email,
      nombres,
      primerApellido,
      segundoApellido,
      lat,
      lng,
    } = updateUserDto;

    try {
      const result = await User.findByPk(id.id);
      if (!result) throw new Error("User not found");

      const emailEqueal = await User.findOne({
        where: {
          txt_email: email,
        },
      });

      if (emailEqueal && emailEqueal!.dataValues.id !== userId) {
        console.log("ESTA ES LA ENTRADA LOCO");
        // throw CustomError.badRequest("Email already exists");
        throw CustomError.badRequest("Email already exists");
      }

      console.log("NO DEBE DE PASAR!!!!!!");
      await User.update(
        {
          txt_nombres: nombres,
          txt_domicilio: domicilio,
          txt_email: email,
          txt_primer_apellido: primerApellido,
          txt_segundo_apellido: segundoApellido,
          txt_lat: lat,
          txt_lng: lng,
        },
        { where: { id: userId } }
      );
    } catch (error) {
      console.log(error);
      throw CustomError.internalServerError();
    }
  }

  async postAllUser(search: SearchDto): Promise<UserEntity[]> {
    const result = await User.findAll({
      where: Sequelize.where(
        Sequelize.fn("LOWER", Sequelize.col("txt_nombres")),
        {
          [Op.like]: `%${search.search.toLowerCase()}%`,
        }
      ),
    });
    return result.map((r) => UserMapper.userEntityFromObject(r));
  }
}
