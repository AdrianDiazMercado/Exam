// internalServerError.ts

import { BaseError } from "src/config/baseError";


export class InternalServerError extends BaseError {
  constructor(message = 'Error interno del servidor') {
    super(500, message, 'Internal Server Error');
  }
}