import { BaseError } from "src/config/baseError";



export class NotFound extends BaseError {
	constructor(message = 'El recurso solicitado no fue encontrado') {
		super(404, message, 'Not Found');
	}
}