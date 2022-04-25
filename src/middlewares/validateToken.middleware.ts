import { NextFunction, Request, Response } from 'express';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

import config from '../configs/jwt.config';

const validateToken =
    (Repository: any) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Missing authorization headers' });
        }

        jsonwebtoken.verify(
            token,
            config.secret,
            async (err, decoded: JwtPayload) => {
                if (err) {
                    return res.status(401).json({ message: err.message });
                }

                let emailKey = Object.keys(Object.values(decoded)[0]).find(
                    (key) => key.toLowerCase().includes('email'),
                );

                const existent = await new Repository().findByEmail(
                    Object.values(decoded)[0][emailKey],
                );

                if (!existent) {
                    return res.status(404).json({ message: 'Token invalid' });
                }

                req.decoded = existent;
                return next();
            },
        );
    };

export default validateToken;
