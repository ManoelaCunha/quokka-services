import { NextFunction, Request, Response } from 'express';
import { CondominiumRepository } from '../repositories';

import Condominium from '../entities/Condominium';

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { trusteeEmail } = req.validated as Condominium;

    const admin = await new CondominiumRepository().findByEmail(trusteeEmail);

    if (!admin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

export default verifyAdmin;
