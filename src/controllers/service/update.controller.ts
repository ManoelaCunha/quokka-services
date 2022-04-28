import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Category from '../../entities/Category';
import Resident from '../../entities/Resident';
import Service from '../../entities/Service';
import { CategoryRepository } from '../../repositories';

const updateService = async (req: Request, res: Response) => {
    const { category } = req.query;
    const { id } = req.params;
    const { title, description } = req.validated as Service;
    const loggedUser = req.decoded;

    let foundCategory: Category;

    if (category) {
        try {
            foundCategory = await new CategoryRepository().findById(
                category as string,
            );
        } catch (error) {
            return res.status(404).json({ error: 'Category not found' });
        }
    }

    try {
        const repo = getRepository(Service);

        const service: Service = await repo.findOne(id);

        if (service.resident.residentId !== loggedUser?.residentId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (title) service.title = title;
        if (description) service.description = description;
        if (foundCategory) service.category = foundCategory;

        repo.save(service);

        const { residentId, name, email } = service.resident as Resident;

        return res.json({
            ...service,
            resident: { residentId, name, email },
            category: service.category.name,
        });
    } catch (error) {
        return res.status(404).json({ error: 'Service not found' });
    }
};

export default updateService;
