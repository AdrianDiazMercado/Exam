// badRequest.ts

import { BaseError } from "src/config/baseError";


export class BadRequest extends BaseError {
  constructor(message = 'La solicitud no fue procesada correctamente') {
    super(400, message, 'Bad Request');
  }
}