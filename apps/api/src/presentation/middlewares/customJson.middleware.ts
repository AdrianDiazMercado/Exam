// presentation/middlewares/customJson.middleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomJson } from "src/config/custom-json";

export const customJsonMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  CustomJson.initialize(req, res, next);
  next();
};
