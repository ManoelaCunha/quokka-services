import { Request, Response } from 'express';
import Category from '../../entities/Category';
import { CategoryRepository } from '../../repositories';

const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    const data: Category = req.decoded as Category;

    try {
        await new CategoryRepository().updateCategory(id, data);

        const updatedData: Category = await new CategoryRepository().findById(
            id,
        );

        return res.json(updatedData);
    } catch (error) {
        return res.status(400).json(error.errors);
    }
};

export default updateCategory;
