import { Router } from "express";
import { AuthDatasourceImpl } from "../../../infrastructure/datasource/auth.datasource.impl";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories/auth.repository.impl";
import { AuthController } from "./controlller";
import { AuthMiddleWare } from "../../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const datasource = new AuthDatasourceImpl();
    const repository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(repository);

    const router = Router();

    router.post("/login", 
      controller.loginUser.bind(controller));

      
    router.post(
      "/register-user",
      AuthMiddleWare.validateJWT,
      controller.registerUser.bind(controller)
    );
    router.get(
      "/get-user/:id",
      AuthMiddleWare.validateJWT,
      controller.getUser.bind(controller)
    );
    router.put(
      "/put-user/:id",
      AuthMiddleWare.validateJWT,
      controller.updateUser.bind(controller)
    );
    router.delete(
      "/delete-user/:id",
      AuthMiddleWare.validateJWT,
      controller.deleteUser.bind(controller)
    );

    router.post(
      "/post-all-users",
      AuthMiddleWare.validateJWT,
      controller.postAllUser.bind(controller)
    );
    return router;
  }
}
