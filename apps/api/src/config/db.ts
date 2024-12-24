import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    (process.env.DB_PASSWORD ?? '') as string,
    {
        host: process.env.HOST,
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        define: {
            timestamps: true,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
);

export default db;
