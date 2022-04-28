import { CorsOptions } from 'cors';

const allowedOrigins = ['*'];

const options: CorsOptions = {
    origin: allowedOrigins,
};

export default options;
