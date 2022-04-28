import { Request, Response } from 'express';
import { CategoryRepository } from '../../repositories';
import Category from '../../entities/Category';

const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;

    const categoryToSave: any = { name: name };

    const allCategories = await new CategoryRepository().findAllCategories();

    const categoryExists = allCategories.find(
        (categoryDB) => categoryDB.name === name,
    );

    if (categoryExists) {
        return res.status(409).json({ error: 'Category already exists!' });
    }

    const newCategory = await new CategoryRepository().saveCategory(
        categoryToSave,
    );

    return res.status(201).json(newCategory);
};

export default createCategory;
