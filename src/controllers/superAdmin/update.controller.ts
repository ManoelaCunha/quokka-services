import { Request, Response } from 'express';
import SuperAdmin from '../../entities/SuperAdmin';
import { SuperAdminRepository } from '../../repositories';

const updateSuperAdmin = async (req: Request, res: Response) => {
    const { uuid } = req.params;
    const data: SuperAdmin = req.body;

    const updatedAdmin = await new SuperAdminRepository().updateSuperAdmin(
        uuid,
        data,
    );

    return res.json(updatedAdmin);
};

export default updateSuperAdmin;
