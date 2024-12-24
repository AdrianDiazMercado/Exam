
import { Response } from 'express';
import { Respuesta_JSON } from 'global-interfaces';
import { BaseError } from './baseError';
import { ValidationError } from './validationError';
import { LogAdapter } from './LogAdapter';



interface JsonResponse<T> {
	success: boolean;
	msg: string;
	result?: T | string[];
	code?: number;
}

export class CustomRes {
	public static error(res: Response, error: Error | BaseError) {
		if (error instanceof BaseError || error instanceof ValidationError) {
			LogAdapter.warning(
				'API Error:',
				JSON.stringify({
					name: error.name,
					status: error.status_code,
					message: error.message,
					errors: error,
				})
			);

			const errors = (error as ValidationError).errors || [];

			return res
				.status(error.status_code)
				.json(
					this.json({ success: false, msg: error.message, result: errors })
				);
		}

		LogAdapter.error('Error NO controlado:', String(error));
		console.log(error);
		res
			.status(500)
			.json(this.json({ success: false, msg: 'Algo salió mal...' }));
	}

	public static json<T>(options: JsonResponse<T>): Respuesta_JSON<T> {
		const { msg, success, result, code = 200 } = options;
		return success
			? { success, msg, result: result as T, type: 'json', code }
			: { success, msg, errors: result as string[] };
	}
}