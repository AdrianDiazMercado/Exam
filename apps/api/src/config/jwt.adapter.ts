import jwt, { JwtPayload } from "jsonwebtoken";
const JWTSECRETE = process.env.JWTSECRETE;
export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: string = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      jwt.sign(payload, JWTSECRETE!, { expiresIn: duration }, (err: any, token: string | undefined) => {
        if (err) 
          return resolve(null);
        resolve(token!);
      });
    });
  }

  static validateToken<Type extends JwtPayload>(token: string): Promise<Type | null> {
    return new Promise((resolve) => {
      const options = { complete: true };
      jwt.verify(token, JWTSECRETE!, options, (err: any, decoded: jwt.Jwt | JwtPayload | string | undefined) => {
        if (err) {
          console.log(err, "Error en validateToken");
          return resolve(null);
        }
        if (decoded && typeof decoded !== 'string') {
          resolve(decoded as Type | null);
        } else {
          resolve(null);
        }
      });
    });
  }
}
