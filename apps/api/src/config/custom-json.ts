import { Request, Response, NextFunction } from "express";

export class CustomJson {
  private static req: Request;
  private static res: Response;
  private static next: NextFunction;

  // Método para inicializar los valores de req, res, next
  public static initialize(req: Request, res: Response, next: NextFunction): void {
    CustomJson.req = req;
    CustomJson.res = res;
    CustomJson.next = next;
  }

  // Método para enviar la respuesta
  public static response(msg: string, success: boolean = false): void {
    if (!CustomJson.res || !CustomJson.next) {
      throw new Error("CustomJson no ha sido inicializado con req, res y next");
    }
    CustomJson.res.status(400).json({ msg, success });
    CustomJson.next();
  }
}
