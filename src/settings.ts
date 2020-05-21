import dotenv from 'dotenv';
import IDatabaseSetting from './interfaces/IDatabaseSetting';

dotenv.config();

export const databaseSettings: IDatabaseSetting = {
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
    database: String(process.env.DATABASE),
    user: String(process.env.USER),
    password: String(process.env.PASSWORD),
};

export const port: number = Number(process.env.APP_PORT);
