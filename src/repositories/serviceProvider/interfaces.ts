import Provider from '../../entities/ServiceProvider';
import { UpdateResult, DeleteResult } from 'typeorm';

interface ServiceProviderRepo {
    saveProvider: (provider: Provider) => Promise<Provider>;
    findAllProviders: () => Promise<Provider[]>;
    findById: (uuid: string) => Promise<Provider>;
    findByEmail: (email: string) => Promise<Provider>;
    updateProvider: (
        uuid: string,
        data: Partial<Provider>,
    ) => Promise<UpdateResult>;
    deleteProvider: (uuid: string) => Promise<DeleteResult>;
}

export default ServiceProviderRepo;
