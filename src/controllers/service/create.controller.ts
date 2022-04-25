import { Request, Response } from 'express';
import Service from '../../entities/Service';
import { CategoryRepository, ResidentRepository } from '../../repositories';
import { getRepository } from 'typeorm';

const createService = async (req: Request, res: Response) => {
    const { validated, decoded } = req;
    const { uuid } = req.params;

    try {
        const service = getRepository(Service);

        const newService = service.create(validated as Service);

        const loggedResident = await new ResidentRepository().findByEmail(
            decoded.email,
        );
        try {
            const category = await new CategoryRepository().findById(uuid);
            newService.resident = loggedResident;
            newService.category = category;

            await service.save(newService);

            const { resident, ...serviceWithoutResident } = newService;
            const {
                password,
                isAuth,
                apartmentBlock,
                apartmentNumber,
                cpf,
                ...newResident
            } = resident;

            return res.status(201).json({
                ...serviceWithoutResident,
                category: category.name,
                resident: newResident,
                serviceProvider: null,
            });
        } catch (error) {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: error.driverError.detail });
    }
};

export default createService;
