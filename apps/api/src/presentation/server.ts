import express, { Router } from 'express';
import db from '../config/db';
import createClients from 'src/postgresql/data/client.seed'; 
import Client from 'src/postgresql/models/client.model';
import { EncryptAdapter } from 'src/config/bcrypt';
import { customJsonMiddleware } from './middlewares/customJson.middleware';

const cors = require("cors");

interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", 'DELETE'],
        // Authorization para token Bearer
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(customJsonMiddleware); // Middleware para inicializar CustomJson
    this.app.use(this.routes);

    try {
      await db.authenticate();
      await db.sync();
      
      // const hashedPassword = await EncryptAdapter.hash('clientmavipasswordsecurity');
      // await Client.create({ 
      //   txt_nombre: 'clientMavi',
      //   txt_email: 'clientMavi@gmail.com',
      //   txt_password: hashedPassword
      // });
      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      console.error('Conexión incompleta a la base de datos:', error);
    }

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}