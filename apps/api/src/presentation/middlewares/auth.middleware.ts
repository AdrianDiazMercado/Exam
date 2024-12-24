import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config/jwt.adapter";
import Client from "../../postgresql/models/client.model";

export class AuthMiddleWare {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.header("authorization");
    if (!authorization)
      return res.status(400).json({ msg: "No token provided" });
    if (!authorization.startsWith("Bearer"))
      return res.status(400).json({ msg: "Invalid Bearer token" });
    const token = authorization.split(" ")[1];
    try {
      const payload = await JwtAdapter.validateToken(token);
      const { id } = payload!.payload;
      if (!payload) return res.status(400).json({ msg: "Invalid token" });
      const client = await Client.findByPk(id);
      if (!client) return res.status(401).json({ msg: "Invalid token" });
      //Crear una nueva propiedad para agregarle el token al body del req
      req.body.user = client;
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  };
}
