import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';

const getAllCategories = async (
    _: Request,
    res: Response,
): Promise<Response> => {
    const categories = await new CategoryRepository().findAllCategories();

    return res.status(200).json(categories);
};

export default getAllCategories;
