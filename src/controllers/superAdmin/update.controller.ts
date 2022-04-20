import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import SuperAdmin from '../../entities/SuperAdmin';
import { SuperAdminRepository } from '../../repositories';

const updateSuperAdmin = async (req: Request, res: Response) => {
    const { uuid } = req.params;

    const data: SuperAdmin = req.validated as SuperAdmin;

    try {
        await new SuperAdminRepository().updateSuperAdmin(uuid, data);

        const updatedData: SuperAdmin = await getRepository(SuperAdmin).findOne(
            uuid,
        );
        const { superAdminId, password, ...rest } = updatedData;

        return res.json(rest);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
};

export default updateSuperAdmin;
