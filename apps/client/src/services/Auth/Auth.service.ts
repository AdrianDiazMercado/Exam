import { Exam_Api } from "@/classes/Exam.api";
import { AxiosError } from "axios";
import { LoginUserPayload, Respuesta_JSON, UserPayload, UserResponse, LoginUserResponse } from "global-interfaces";

export class Auth_Service {
  static readonly auth_api: Exam_Api = new Exam_Api();
  static readonly path: string = "/auth";

  static async postLogin(body: LoginUserPayload){
    try {
      const endpoint = `${this.path}/login`
      const response = await this.auth_api.request.post<Respuesta_JSON<LoginUserResponse>>(endpoint, body);
      return response.data;
    } catch (error) {
      return this.auth_api.get_errors(error as AxiosError);
    }
  }

  static async postCreateUser(body: UserPayload) {
    try {
      const endpoint = `${this.path}/register-user`;
      const response = await this.auth_api.request.post<Respuesta_JSON<void>>(endpoint, body);
      return response.data
    } catch (error) {
      return this.auth_api.get_errors(error as AxiosError);
    }
  }

  static async putUpdateUser(id: number,body: UserPayload){
    try {
      const endpoint = `${this.path}/put-user/${id}`;
      const response = await this.auth_api.request.put<Respuesta_JSON<void>>(endpoint, body);
      return response.data
    } catch (error) {
      return this.auth_api.get_errors(error as AxiosError);
    }
  }

  static async deleteUser(id: number){
      try {
          const endpoint = `${this.path}/delete-user/${id}`;
          const response = await this.auth_api.request.delete<Respuesta_JSON<void>>(endpoint)
          return response.data;
      } catch (error) {
        return this.auth_api.get_errors(error as AxiosError);
      }
  }

  static async getInfoUser(id: number){
      try {
          const endpoint = `${this.path}/get-user/${id}`
          const response = await this.auth_api.request.get<Respuesta_JSON<UserResponse>>(endpoint)
          return response.data;
      } catch (error) {
        return this.auth_api.get_errors(error as AxiosError);
      }
  }

  static async postAllUser(search: string){
      try {

          const endpoint = `${this.path}/post-all-users`;
          const response = await this.auth_api.request.post<Respuesta_JSON<UserResponse>>(endpoint, {search})
          return response.data;
      } catch (error) {
        return this.auth_api.get_errors(error as AxiosError);
      }
  }

}
