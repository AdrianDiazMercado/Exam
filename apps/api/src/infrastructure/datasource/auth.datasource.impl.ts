import { AuthDatasource } from "../../domain/datasource/auth.datasource";
import { IdDto } from "../../domain/dtos/auth/id.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/register-user.dto";
import { UpdateUserDto } from "../../domain/dtos/auth/update-user.dto";
import { UserEntity } from "../../domain/entities/user.entity";
import User from "../../postgresql/models/user.model";
import Client from "../../postgresql/models/client.model";
import { UserMapper } from "../mappers/user.mapper";
import { SearchDto } from "../../domain/dtos/search-user.dto";
import { Op, Sequelize } from "sequelize";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { ClientEntity } from "../../domain/entities/client.entity";
import { EncryptAdapter } from "../../config/bcrypt";
import { JwtAdapter } from "../../config/jwt.adapter";
import { ClientMapper } from "../mappers/client.mapper";
import { NotFound } from "src/domain/errors/notFound";
import { BadRequest } from "src/domain/errors/BadRequest";



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
      const user = await Client.findOne({
        where: {
          txt_email: email,
        },
      });
      if (!user) throw new NotFound("Usuario no encontrado");
      const isMatching = await this.compare(
        password,
        user.dataValues.txt_password
      );
      if (!isMatching) throw new BadRequest("Credenciales incorrectas");
      const { id, txt_nombre } = user.dataValues;
      const txt_token = await this.generateToken({ id, txt_nombre }, "8h");
      return ClientMapper.clientEntityFromObject({ txt_token });
  }
  async deleteUser(id: IdDto): Promise<void> {
      const userDelete = await User.findByPk(id.id);
      if (!userDelete) throw new NotFound("Usuario no encontrado");
      await User.destroy({
        where: {
          id: id.id,
        },
      });
  }

  async getUser(id: IdDto): Promise<UserEntity> {
    const result = await User.findByPk(id.id);
    if (!result) throw new NotFound("Usuario no encontrado");
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

    if (emailEqueal) throw new BadRequest("Email ya existe");

      const user = await User.create({
        txt_nombres: nombres,
        txt_domicilio: domicilio,
        txt_email: email,
        txt_primer_apellido: primerApellido,
        txt_segundo_apellido: segundoApellido,
        txt_lat: lat,
        txt_lng: lng,
      });
      await user.save();
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

      const result = await User.findByPk(id.id);
      if (!result) throw new NotFound("Usuario no encontrado");

      const emailEqueal = await User.findOne({
        where: {
          txt_email: email,
        },
      });

      if (emailEqueal && emailEqueal!.dataValues.id !== userId)
        throw new BadRequest("Email ya existe");

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
