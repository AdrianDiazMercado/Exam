import { LoginUserPayload } from "global-interfaces";
import {
	IsEmail,
	IsNotEmpty,
	TrimTransform,
  } from "../../../config/validation";
import { ValidationGroups } from "src/common/enum/groups.enum";

export class LoginUserDto implements LoginUserPayload{
	@IsEmail(
		{
			allow_ip_domain: false,
		},
		{
			message: "El correo electrónico no es válido y es requerido",
			groups: [
				ValidationGroups.READ,
			],
		}
	)
	@TrimTransform()
	  email!: string;
	  @IsNotEmpty({
		message: "Password es requerida",
		groups: [
		  ValidationGroups.READ,
		],
	  })
	  @TrimTransform()
	password!: string;

}