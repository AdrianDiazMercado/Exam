import { EncryptAdapter } from "../../config/bcrypt";

const clients = [
	{
		txt_nombre: 'clientMavi',
		txt_email: 'clientMavi@gmail.com',
		txt_password: EncryptAdapter.hash('clientmavipasswordsecurity')
	}
]


export default clients;

