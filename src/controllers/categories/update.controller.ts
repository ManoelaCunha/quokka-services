import { Request, Response } from 'express';
import Category from '../../entities/Category';
import { CategoryRepository } from '../../repositories';

const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const category = await new CategoryRepository().findById(id);

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await new CategoryRepository().updateCategory(id, {
            name: req.body.name,
        });

        const updatedData: Category = await new CategoryRepository().findById(
            id,
        );

        return res.json(updatedData);
    } catch (error) {
        return res.status(400).json({
            error: 'Requisition failed, verify the parameters and try again',
        });
    }
};

export default updateCategory;
