import { ClientEntity } from "src/domain/entities/client.entity";

export class ClientMapper {
	  static clientEntityFromObject(object: { [key: string]: any }) {
		const { txt_token} = object;
		return new ClientEntity({
			jwt: txt_token
		});
	  }
}