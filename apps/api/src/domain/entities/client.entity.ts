interface Attr { 
	jwt: string | null
}


export class ClientEntity { 
	public readonly jwt: string | null;
	constructor(attr:Attr){
		this.jwt = attr.jwt
	}
}