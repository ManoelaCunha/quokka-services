import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import bcrypt, { hashSync } from 'bcrypt';
import { Connection, getConnection } from 'typeorm';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../configs/jwt.config';

dotenv.config();

const generateSuperAdm = () => {
    const name = faker.name.firstName().toLowerCase();
    const username = faker.name.firstName().toLowerCase();
    const word = faker.word.adjective();
    const password = bcrypt.hashSync(faker.word.preposition(4), 10);

    return {
        uuid: v4(),
        name,
        email: `${username}@${word}.com`,
        password,
    };
};

const generateSuperAdminToken = () => {
    const token = jsonwebtoken.sign(
        {
            existent: {
                superAdminId: v4(),
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL,
                password: hashSync(process.env.SUPER_ADMIN_PASSWORD, 10),
            },
        },
        config.secret,
        {
            expiresIn: config.expiresIn,
        },
    );
    return token;
};

const cleardata = (): Connection => {
    const defaultConnection = getConnection('default');
    const entities = defaultConnection.entityMetadatas;

    entities.forEach(async (entity) => {
        const repository = defaultConnection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    return defaultConnection;
};

export { generateSuperAdm, cleardata, generateSuperAdminToken };
