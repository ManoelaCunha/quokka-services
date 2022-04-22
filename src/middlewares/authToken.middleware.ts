import config from '../configs/jwt.config';

import { NextFunction, Request, Response } from 'express';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const authToken =
    (Repository: any) =>
    async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response | void> => {
        try {
            let emailKey = Object.keys(req.validated).find((key) =>
                key.includes('mail'),
            );

            const existent = await new Repository().findByEmail(
                req.validated[emailKey],
            );

            let passwordKey = Object.keys(req.validated).find((key) =>
                key.includes('assword'),
            );

            if (
                !existent ||
                !compareSync(req.validated[passwordKey], existent[passwordKey])
            ) {
                return res
                    .status(401)
                    .json({ message: 'Wrong email/password' });
            }

            const token: string = sign({ existent }, config.secret, {
                expiresIn: config.expiresIn,
            });

            req.token = token;

            return next();
        } catch (err) {
            return res.status(400).json({ error: err.errors });
        }
    };

export default authToken;
