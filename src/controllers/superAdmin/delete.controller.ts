import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const deleteSuperAdmin = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    await new SuperAdminRepository().deleteSuperAdmin(uuid);

    return res.status(204).send();
};

export default deleteSuperAdmin;
