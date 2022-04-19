import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { SuperAdminRepository } from '../../repositories';
import SuperAdmin from '../../entities/SuperAdmin';
import { v4 } from 'uuid';

const createSuperAdmin = async (req: Request, res: Response) => {
    const body = req.body;
    const hashedPass = await bcrypt.hash(body.password, 10);
    const superAdm: SuperAdmin =
        await new SuperAdminRepository().saveSuperAdmin({
            name: body.name,
            email: body.email,
            password: hashedPass,
            superAdminId: v4(),
        });

    const userWithoutPass: SuperAdmin = JSON.parse(JSON.stringify(superAdm));
    delete userWithoutPass.password;

    return res.status(201).json(userWithoutPass);
};

export default createSuperAdmin;
