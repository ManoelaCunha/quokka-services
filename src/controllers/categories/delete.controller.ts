import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

const deleteCategory = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    await new CategoryRepository().deleteCategory(id);

    return res.status(204).send();
};

export default deleteCategory;
