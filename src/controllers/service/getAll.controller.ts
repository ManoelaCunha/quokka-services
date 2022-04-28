import { Request, Response } from 'express';
import Service from '../../entities/Service';
import { ServiceRepository } from '../../repositories';
import { getRepository } from 'typeorm';

const getAllServices = async (req: Request, res: Response) => {
    const { status } = req.query;

    const acceptedStatus = ['pending', 'available', 'done'];

    if (status && !acceptedStatus.includes(status as string)) {
        return res.status(400).json({
            error: 'Invalid status parameter',
        });
    }

    const services = acceptedStatus.includes(status as string)
        ? await getRepository(Service).find({ where: { status } })
        : await new ServiceRepository().findServices();

    services.forEach((service) => {
        delete service.resident.password;
        delete service.resident.cpf;
        delete service.category.categoryId;
    });

    return res.status(200).json(services);
};

export default getAllServices;
