import { Request, Response } from 'express';
import { EntityColumnNotFound } from 'typeorm';
import { ServiceProviderRepository } from '../../repositories';

const updateProvider = async (req: Request, res: Response) => {
    try {
        if (Object.keys(req.body).includes('cpf')) {
            return res
                .status(401)
                .json({ error: "Unauthorized update on 'cpf' key" });
        }
        await new ServiceProviderRepository().updateProvider(
            req.params.id,
            req.body,
        );

        const updatedUser = await new ServiceProviderRepository().findById(
            req.params.id,
        );
        return res.status(200).json(updatedUser);
    } catch (err) {
        if (err instanceof EntityColumnNotFound) {
            return res.status(400).json({ error: err.message });
        }
        return res.status(400).json({ error: err });
    }
};

export default updateProvider;
