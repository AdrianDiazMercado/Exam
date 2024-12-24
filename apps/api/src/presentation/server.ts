import express, { Router } from 'express';
import db from '../config/db';

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
    this.app.use(this.routes);
    try {
      await db.authenticate();
      await db.sync();

      console.log('Conexión exitosa a la base de datos');
    } catch (error) {
      console.error('Conexión incompleta a la base de datos:', error);
    }

    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}