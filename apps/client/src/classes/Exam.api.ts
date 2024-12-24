import { ApiExam } from "@/Api";
import { Respuesta_JSON } from "global-interfaces";
import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import { useAuthStore } from '../store/Auth/auth.store';

export class Exam_Api {
  public base_url: string;
  public headers: object;
  public request: AxiosInstance;

  constructor(headers?: object) {
    this.base_url = ApiExam;
    this.headers = headers || {
      'Content-type': 'application/json',
    };
    this.request = axios.create({
      baseURL: this.base_url,
      headers: this.headers,
    });
    // Antes de cada peticion
    this.get_interceptor();
  }

  private get_interceptor() {
    this.request.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = useAuthStore().token;
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      }
    );
  }

  public get_errors(error: AxiosError): Respuesta_JSON<null> {
    type ErrorType = {
      [key: string]: Respuesta_JSON<null>;
    };

    const errors: ErrorType = {
      ERR_NETWORK: {
        success: false,
        msg: 'Error al conectarse con el servidor',
      },
      ERR_BAD_REQUEST: error.response?.data as Respuesta_JSON<null>,
      CUSTOM_ERROR: { success: false, msg: 'Algo salió mal...' },
    };

    const name_error = error?.code || 'CUSTOM_ERROR';
    return errors[name_error] || errors['CUSTOM_ERROR'];
  }
}
