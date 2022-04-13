import dotenv from 'dotenv';
import { JWTConfig } from './interfaces';

dotenv.config();

const config: JWTConfig = {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN ?? '24h',
};

export default config;
