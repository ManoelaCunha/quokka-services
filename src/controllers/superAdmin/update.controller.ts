import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import SuperAdmin from '../../entities/SuperAdmin';
import { SuperAdminRepository } from '../../repositories';

const updateSuperAdmin = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: SuperAdmin = req.validated as SuperAdmin;

    try {
        await new SuperAdminRepository().updateSuperAdmin(id, data);

        const updatedData: SuperAdmin = await getRepository(SuperAdmin).findOne(
            id,
        );
        const { superAdminId, password, ...rest } = updatedData;

        return res.json(rest);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid body' });
    }
};

export default updateSuperAdmin;
