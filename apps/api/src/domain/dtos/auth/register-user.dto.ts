import { UserPayload } from "global-interfaces";
import { ValidationGroups } from "src/common/enum/groups.enum";
import {
  IsEmail,
  TrimTransform,
  IsNotEmpty,
  IsOptional
} from "../../../config/validation";

export class RegisterUserDto implements UserPayload {
  @IsNotEmpty({
    message: "Los nombres son requeridos",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  @TrimTransform()
  nombres!: string;
  @IsNotEmpty({
    message: "primerApellido es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  @TrimTransform()
  primerApellido!: string;
  @IsNotEmpty({
    message: "segundoApellido es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  @TrimTransform()
  segundoApellido!: string;
  @IsNotEmpty({
    message: "domicilio es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  @TrimTransform()
  domicilio!: string;
  @IsEmail(
    {
      allow_ip_domain: false,
    },
    {
      message: "El correo electrónico no es válido",
      groups: [
        ValidationGroups.CREATE,
        ValidationGroups.READ,
        ValidationGroups.UPDATE,
      ],
    }
  )
  @TrimTransform()
  email!: string;
  @IsOptional()
  @TrimTransform()
  lat!: string;
  @IsOptional()
  @TrimTransform()
  lng!: string;
}
