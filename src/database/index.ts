import { createConnection } from 'typeorm';
import dbConfig from './ormconfig';

const connection = async () => {
    await createConnection(dbConfig);
};

export default connection;
