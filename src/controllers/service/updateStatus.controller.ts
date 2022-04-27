import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Service from '../../entities/Service';
import { ServiceProviderRepository } from '../../repositories';

const updateServiceStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.query;
    const loggedUser = req.decoded;

    if (
        status &&
        !['available', 'pending', 'done'].includes(status as string)
    ) {
        return res.status(400).json({
            error: 'Invalid status value - available | pending | done',
        });
    }

    if (!status) {
        return res.status(400).json({ error: 'Missing status parameter' });
    }

    let foundService: Service;
    const serviceRepo = getRepository(Service);
    const serviceProvider = await new ServiceProviderRepository().findById(
        loggedUser.serviceProviderId,
    );

    try {
        foundService = await serviceRepo.findOne(id);

        if (status === 'pending') {
            foundService.serviceProvider = serviceProvider;
        }
        if (status === 'available') {
            foundService.serviceProvider = null;
        }

        foundService.status = status as string;

        serviceRepo.save(foundService);

        const { residentId, name, email } = foundService.resident;
        const {
            password,
            cpf,
            condominiumServiceProviders,
            ...restServiceProvider
        } = serviceProvider;

        const resultSchema = {
            ...foundService,
            resident: { residentId, name, email },
            category: foundService.category.name,
            serviceProvider: restServiceProvider,
        };

        return res.json(resultSchema);
    } catch (error) {
        return res.status(404).json({ error: 'Service not found' });
    }
};

export default updateServiceStatus;
