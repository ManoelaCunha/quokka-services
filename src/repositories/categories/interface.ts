import Category from '../../entities/Category';
import { UpdateResult, DeleteResult } from 'typeorm';

interface ICategoryRepository {
    saveCategory: (category: Category) => Promise<Category>;
    findAllCategories: () => Promise<Category[]>;
    findById: (uuid: string) => Promise<Category>;
    updateCategory: (
        uuid: string,
        item: Partial<Category>,
    ) => Promise<UpdateResult>;
    deleteCategory: (uuid: string) => Promise<DeleteResult>;
}

export default ICategoryRepository;
