import { Request, Response } from 'express';
import { CondominiumRepository } from '../../repositories';

const deleteCondominium = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const foundCondo = await new CondominiumRepository().findById(id);
        if (!foundCondo) {
            return res
                .status(404)
                .json({ error: 'Condominium doest not exist' });
        }

        await new CondominiumRepository().deleteCondominium(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: 'Condominium not found' });
    }
};

export default deleteCondominium;
