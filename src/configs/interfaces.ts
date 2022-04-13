type ExpiresIN = string | number;

interface JWTConfig {
    secret: string;
    expiresIn: ExpiresIN;
}

export { JWTConfig };
