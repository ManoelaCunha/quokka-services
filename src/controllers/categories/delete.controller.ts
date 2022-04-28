import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

const deleteCategory = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    const categoryToDelete = await new CategoryRepository().findById(id);

    if (!categoryToDelete) {
        res.status(404).json({ error: 'category not found!' });
    }

    await new CategoryRepository().deleteCategory(id);

    return res.status(204).send();
};

export default deleteCategory;
