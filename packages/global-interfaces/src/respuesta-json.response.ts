export interface Respuesta_JSON<T> {
	success: boolean;
	msg: string;
	result?: T;
	errors?: string[];
	type?: string;
	code?: number;
  }
  
  