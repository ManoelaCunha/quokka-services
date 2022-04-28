import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { Connection, getConnection } from 'typeorm';

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

const cleardata = (): Connection => {
    const defaultConnection = getConnection('default');
    const entities = defaultConnection.entityMetadatas;

    entities.forEach(async (entity) => {
        const repository = defaultConnection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    return defaultConnection;
};

export { generateSuperAdm, cleardata };
