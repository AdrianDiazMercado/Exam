import { NextFunction, Request, Response } from "express";
import { CustomRes } from "src/config/customRes";

type TypeFunction = "controller" | "middleware";
interface Options {
  type: TypeFunction;
}

interface CustomResponse {
  type?: "json" | string;
  code?: number;
  data?: any;
}

export function ResponseHandler(options: Options) {
  return function (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const { type = "controller" } = options;
    const originalMethod = descriptor.value;

    descriptor.value = async function (
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      try {
        const response: CustomResponse | void = await originalMethod.call(
          this,
          req,
          res,
          next
        );
        if (res.headersSent) {
          return;
        }

        if (type === "controller") {
          if (response?.type === "json") {
            res.status(response.code || 200).json(response.data);
            return;
          }

          if (!response) {
            throw new Error(
              "La respuesta del controlador no tiene el formato esperado."
            );
          }

          throw new Error(
            `Tipo de respuesta: ${response.type} no existe en ResponseHandler`
          );
        }
      } catch (error) {
        if (!res.headersSent) {
          CustomRes.error(res, error as any);
        }
      }
    };
  };
}
