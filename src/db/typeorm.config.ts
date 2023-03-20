import {DataSource, DataSourceOptions} from "typeorm";
import {config} from "dotenv";
config()
export const connectionDB: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/db/entities/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    synchronize: false,
}
export default new DataSource({...connectionDB})
