import { Request, Response } from 'express';
import { SuperAdminRepository } from '../../repositories';

const deleteSuperAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;

    const superAdm = await new SuperAdminRepository().deleteSuperAdmin(id);

    return res.status(204).send();
};

export default deleteSuperAdmin;
