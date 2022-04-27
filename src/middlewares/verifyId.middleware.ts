import { Request, Response, NextFunction } from 'express';

const verifyId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { residentId, serviceProviderId, condominiumId, superAdminId } =
        req.decoded;

    if (residentId) {
        if (id !== residentId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    if (serviceProviderId) {
        if (id !== serviceProviderId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    if (condominiumId) {
        if (id !== condominiumId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    if (superAdminId) {
        if (id !== superAdminId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }

    return next();
};

export default verifyId;
