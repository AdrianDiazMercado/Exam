import { EncryptAdapter } from "../../config/bcrypt";

const getClients = async () => {
  const clients = [
    {
      txt_nombre: 'clientMavi',
      txt_email: 'clientMavi@gmail.com',
      txt_password: await EncryptAdapter.hash('clientmavipasswordsecurity')
    }
  ];
  return clients;
};
export default getClients;
