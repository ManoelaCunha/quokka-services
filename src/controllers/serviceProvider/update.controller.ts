import { Request, Response } from 'express';
import { ServiceProviderRepository } from '../../repositories';

const updateProvider = async (req: Request, res: Response) => {
    if (Object.keys(req.body).includes('isAuth')) {
        return res
            .status(401)
            .json({ error: "Unauthorized to update the 'isAuth' value" });
    }
    await new ServiceProviderRepository().updateProvider(
        req.params.id,
        req.body,
    );

    const updatedUser = await new ServiceProviderRepository().findById(
        req.params.id,
    );

    return res.status(201).json(updatedUser);
};

export default updateProvider;
