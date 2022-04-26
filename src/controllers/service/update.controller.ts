import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../entities/Category';
import Resident from '../../entities/Resident';
import Service from '../../entities/Service';
import { CategoryRepository } from '../../repositories';

const updateService = async (req: Request, res: Response) => {
    const { status, category } = req.query;
    const { id } = req.params;
    const { title, description } = req.validated as Service;

    let foundCategory: Category;

    if (category) {
        try {
            foundCategory = await new CategoryRepository().findById(
                category as string,
            );
        } catch (error) {
            return res.status(404).json({ message: 'Category not found' });
        }
    }

    try {
        const repo = getRepository(Service);

        const service: Service = await repo.findOne(id);

        if (title) service.title = title;
        if (description) service.description = description;
        if (foundCategory) service.category = foundCategory;

        if (['available', 'pending', 'done'].includes(status as string)) {
            service.status = status as string;
        }

        try {
            repo.save(service);

            const { residentId, name, email } = service.resident as Resident;

            return res.json({
                ...service,
                resident: { residentId, name, email },
                category: service.category.name,
            });
        } catch (error) {
            return res.json(error);
        }
    } catch (error) {
        return res.status(404).json({ message: 'Service not found' });
    }
};

export default updateService;
