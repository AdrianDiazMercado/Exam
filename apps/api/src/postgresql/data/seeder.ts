import db from "../../config/db";
import Client from "../models/client.model";
import User from "../models/user.model";
import clients from "./client.seed";

export class Seeder {
  async run() {
    try {
      await db.authenticate();
      console.log("Conexión exitosa a la base de datos");
      await db.sync({ force: true });
      console.log("Sincronización exitosa");
      await this.truncateTables();
      await Client.bulkCreate(clients);
      console.log("Datos insertados correctamente");
      process.exit(0);
    } catch (error) {
      console.error("Conexión incompleta a la base de datos:", error);
      process.exit(1);
    }
  }

  private async truncateTables() {
    try {
	await Promise.all([
		User.destroy({ where: {}, truncate: true }),
		Client.destroy({ where: {}, truncate: true })
	])
      console.log("Tablas truncadas correctamente");
    } catch (error) {
      console.error("Error al truncar las tablas:", error);
    }
  }
}

(async () => {
  const seeder = new Seeder();
  await seeder.run();
})();
