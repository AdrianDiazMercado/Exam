import { AuthRepository } from "../../../domain/repositories/Auth/auth.repositoty";
import { Request, Response } from "express";
import { RegistarUser } from "../../../domain/use-cases/register-user.use-case";
import { GetUser } from "../../../domain/use-cases/get-user.use-case";
import { UpdateUser } from "../../../domain/use-cases/update-user.use-case";
import { DeleteUser } from "../../../domain/use-cases/delete-user.use-case";
import { PostAllUser } from "../../../domain/use-cases/post-all-users.use-case";
import { RegisterUserDto } from "src/domain/dtos/auth/register-user.dto";
import { ValidationGroups } from "src/common/enum/groups.enum";
import { ValidationDto } from "src/config/validationClass";
import { LoginUserDto } from "src/domain/dtos/auth/login-user.dto";
import { LoginUser } from "src/domain/use-cases/login-user.use-case";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  public async loginUser(req: Request, res: Response) {
    const { body } = req;
    
    const validationResult = await ValidationDto.validateDto(
      LoginUserDto,
      body,
      [ValidationGroups.READ]
    );
    if (validationResult) {
      return res.status(validationResult.code).json(validationResult);
    }
    const result = await new LoginUser(this.authRepository).execute(body);
    return res.status(200).json({
      msg: "Bienvenido",
      code: 200,
      success: true,
      result,
    });
  }

  public async registerUser(req: Request, res: Response) {
    const { body } = req;
    //Validacion del DTO
    const validationResult = await ValidationDto.validateDto(
      RegisterUserDto,
      body,
      [ValidationGroups.CREATE, ValidationGroups.READ, ValidationGroups.UPDATE]
    );

    if (validationResult) {
      return res.status(validationResult.code).json(validationResult);
    }

    await new RegistarUser(this.authRepository).execute(body);
    res.status(200).json({
      msg: "Usuario creado correctamente",
      code: 200,
      success: true,
    });
  }

  public async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const result = await new GetUser(this.authRepository).execute({ id: +id });
    res.status(200).json({
      msg: "Usuario encontrado correctamente",
      success: true,
      code: 200,
      result,
    });
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;
    await new UpdateUser(this.authRepository).execute({ id: +id }, body);
    res.status(200).json({
      msg: "Usuario modificado correctamente",
      code: 200,
      success: true,
    });
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id, "dame el id");
    await new DeleteUser(this.authRepository).execute({ id: +id });
    res.status(200).json({
      msg: "Usuario eliminadoo correctamente",
      code: 200,
      success: true,
    });
  }

  public async postAllUser(req: Request, res: Response) {
    const { body } = req;
    const result = await new PostAllUser(this.authRepository).execute(body);
    res.status(200).json({
      msg: "Informacion obtenida correctamente",
      success: true,
      code: 200,
      result,
    });
  }
}
