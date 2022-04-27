import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

const getCategoryById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    const category = await new CategoryRepository().findById(id);

    if (!category) {
        res.status(404).json({ error: 'category not found!' });
    }

    return res.status(200).json(category);
};

export default getCategoryById;
