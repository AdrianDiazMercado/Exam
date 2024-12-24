import { UserEntity } from "../../domain/entities/user.entity";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id,txt_nombres, txt_domicilio, txt_email, txt_primer_apellido, txt_segundo_apellido, txt_lat, txt_lng} = object;
    return new UserEntity({
		id,
		nombres: txt_nombres,
		domicilio: txt_domicilio,
		email: txt_email,
		primerApellido: txt_primer_apellido,
		segundoApellido: txt_segundo_apellido,
		lat: txt_lat,
		lng: txt_lng
	});
  }
}

