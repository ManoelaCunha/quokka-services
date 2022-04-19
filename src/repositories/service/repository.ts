import { Repository, getRepository } from 'typeorm';

import Service from '../../entities/Service';
import { IServiceRepository } from './interface';

class ServiceRepository implements IServiceRepository {
    private ormRepo: Repository<Service>;

    constructor() {
        this.ormRepo = getRepository(Service);
    }

    saveService = async (data: Service) => {
        return await this.ormRepo.save(data);
    };

    findServices = async () => {
        return await this.ormRepo.find();
    };

    findServiceById = async (uuid: string) => {
        return await this.ormRepo.findOne(uuid);
    };

    updateService = async (uuid: string, data: Partial<Service>) => {
        await this.ormRepo.update(uuid, data);
        return await this.ormRepo.findOne(uuid);
    };

    deleteService = async (uuid: string) => {
        await this.ormRepo.delete(uuid);
    };
}

export { ServiceRepository };
