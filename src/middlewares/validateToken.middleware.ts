import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../configs/jwt.config';

import { NextFunction, Request, Response } from 'express';

const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res
                .status(401)
                .json({ message: 'Missing authorization headers' });
        }

        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: 'Missing authorization headers' });
            }

            req.decoded = decoded as JwtPayload;

            return next();
        });
    } catch (err) {
        return res.status(400).json({ error: err.errors });
    }
};

export default validateToken;
