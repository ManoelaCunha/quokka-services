import path from 'path';
import dotenv from 'dotenv';

import { ConnectionOptions } from 'typeorm';

dotenv.config();

const devConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database:
        process.env.NODE_ENV !== 'test'
            ? process.env.POSTGRES_DB
            : process.env.TEST_DATABASE,
    synchronize: true,
    logging: false,
    entities: [path.join(__dirname, '../entities/**/*.*')],
    migrations: [path.join(__dirname, '../migrations/**/*.*')],
    cli: {
        entitiesDir: path.join(__dirname, '../entities'),
        migrationsDir: path.join(__dirname, '../migrations'),
    },
} as ConnectionOptions;

const prodConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    ssl: { rejectUnauthorized: false },
    entities: [path.join(__dirname, '../entities/**/*.*')],
    migrations: [path.join(__dirname, '../migrations/**/*.*')],
    cli: {
        entitiesDir: path.join(__dirname, '../entities'),
        migrationsDir: path.join(__dirname, '../migrations'),
    },
} as ConnectionOptions;

export default process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
