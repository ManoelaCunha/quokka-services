import Provider from '../../entities/ServiceProvider';
import { UpdateResult, DeleteResult } from 'typeorm';
import { string } from 'yup';

interface ServiceProviderRepo {
    saveProvider: (provider: Provider) => Promise<Provider>;
    findProvider: () => Promise<Provider[]>;
    findProviderById: (uuid: string) => Promise<Provider>;
    updateProvider: (
        uuid: string,
        data: Partial<Provider>,
    ) => Promise<UpdateResult>;
    deleteProvider: (uuid: string) => Promise<DeleteResult>;
}

export default ServiceProviderRepo;
