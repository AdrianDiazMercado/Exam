interface Attr {
  id: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  domicilio: string;
  email: string;
  lat: string | null;
  lng: string | null
}

export class UserEntity {
  public readonly id: string;
  public readonly nombres: string;
  public readonly primerApellido: string;
  public readonly segundoApellido: string;
  public readonly domicilio: string;
  public readonly email: string;
  public readonly lat: string | null;
  public readonly lng: string | null;


	constructor(attr: Attr){
		this.id = attr.id
		this.nombres = attr.nombres
		this.primerApellido = attr.primerApellido
		this.segundoApellido = attr.segundoApellido
		this.domicilio = attr.domicilio
		this.email = attr.email
    this.lat = attr.lat
    this.lng = attr.lng
	}
}
