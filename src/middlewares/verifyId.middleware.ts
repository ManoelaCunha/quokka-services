import { Request, Response, NextFunction } from 'express';

const verifyId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { residentId, serviceProviderId, condominiumId, superAdminId } =
        req.decoded;

    if (residentId) {
        if (id !== residentId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    if (serviceProviderId) {
        if (id !== serviceProviderId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    if (condominiumId) {
        if (id !== condominiumId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    if (superAdminId) {
        if (id !== superAdminId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }

    return next();
};

export default verifyId;
