import { SuperAdminRepository } from '../repositories';

import { NextFunction, Request, Response } from 'express';
import SuperAdmin from '../entities/SuperAdmin';

const verifySuperAdmin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { email } = req.decoded as SuperAdmin;

    const superAdmin = await new SuperAdminRepository().findByEmail(email);

    if (!superAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
};

export default verifySuperAdmin;
