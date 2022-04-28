import { createConnection } from 'typeorm';
import dbConfig from './ormconfig';

const connectionTests = async () => {
    await createConnection(dbConfig);
};

export default connectionTests;
