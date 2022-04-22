import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

const getCategoryById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    const { id } = req.params;

    const category = await new CategoryRepository().findCategoryById(id);

    return res.status(200).json(category);
};

export default getCategoryById;
