import { UserPayload } from "global-interfaces";
import { ValidationGroups } from "src/common/enum/groups.enum";
import { IsEmail, TrimTransform, IsNotEmpty } from "../../../config/validation";

export class UpdateUserDto implements UserPayload {
  @TrimTransform()
  @IsNotEmpty({
    message: "Los nombres son requeridos",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  nombres!: string;
  @TrimTransform()
  @IsNotEmpty({
    message: "primerApellido es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  primerApellido!: string;
  @TrimTransform()
  @IsNotEmpty({
    message: "segundoApellido es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  segundoApellido!: string;
  @TrimTransform()
  @IsNotEmpty({
    message: "domicilio es requerido",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
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
  email!: string;
  @TrimTransform()
  @IsNotEmpty({
    message: "Latitud es requerida",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  lat!: string;
  @TrimTransform()
  @IsNotEmpty({
    message: "Longitud es requerida",
    groups: [
      ValidationGroups.CREATE,
      ValidationGroups.READ,
      ValidationGroups.UPDATE,
    ],
  })
  lng!: string;
  
}
