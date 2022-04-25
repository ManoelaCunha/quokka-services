import { Request, Response } from 'express';
import Service from '../../entities/Service';
import { CategoryRepository, ResidentRepository } from '../../repositories';
import { getRepository } from 'typeorm';

const createService = async (req: Request, res: Response) => {
    const { validated, decoded } = req;
    const { uuid } = req.params;

    if (!uuid) {
        return res.status(400).json({ message: 'Missing uuid' });
    }

    try {
        const service = getRepository(Service);

        const newService = service.create(validated as Service);

        const resident = await new ResidentRepository().findByEmail(
            decoded.email,
        );
        try {
            const category = await new CategoryRepository().findCategoryById(
                uuid,
            );

            newService.resident = resident;
            newService.category = category;

            await service.save(newService);

            const { serviceId, title, description, status } = newService;

            return res.status(201).json({
                serviceId,
                title,
                description,
                category: category.name,
                status,
            });
        } catch (error) {
            return res.status(404).json({ message: error.driverError.detail });
        }
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createService;
