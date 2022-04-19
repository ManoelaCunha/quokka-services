import { Repository, getRepository } from 'typeorm';
import Category from '../../entities/Category';
import ICategoryRepository from './interface';

class CategoryRepository implements ICategoryRepository {
    private ormRepository: Repository<Category>;

    constructor() {
        this.ormRepository = getRepository(Category);
    }

    saveCategory = async (category: Category) =>
        await this.ormRepository.save(category);

    findAllCategories = async () => await this.ormRepository.find();

    findCategoryById = async (uuid: string) => {
        return await this.ormRepository.findOne({ where: { uuid } });
    };

    updateCategory = async (uuid: string, item: Partial<Category>) => {
        return await this.ormRepository.update(uuid, item);
    };

    deleteCategory = async (uuid: string) => {
        return await this.ormRepository.delete(uuid);
    };
}

export { CategoryRepository, ICategoryRepository };
