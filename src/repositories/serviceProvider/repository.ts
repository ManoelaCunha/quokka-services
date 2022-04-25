import { Repository, getRepository } from 'typeorm';
import Provider from '../../entities/ServiceProvider';
import ServiceProviderRepo from './interfaces';

class ServiceProviderRepository implements ServiceProviderRepo {
    private ormRepository: Repository<Provider>;

    constructor() {
        this.ormRepository = getRepository(Provider);
    }

    saveProvider = async (provider: Provider) =>
        await this.ormRepository.save(provider);

    findAllProviders = async () => await this.ormRepository.find();

    findProviderById = async (uuid: string) => {
        return await this.ormRepository.findOne({ where: { uuid } });
    };

    findByEmail = async (email: string) => {
        return await this.ormRepository.findOne({
            where: { email },
        });
    };

    updateProvider = async (uuid: string, data: Partial<Provider>) => {
        return await this.ormRepository.update(uuid, data);
    };

    deleteProvider = async (uuid: string) =>
        await this.ormRepository.delete(uuid);
}

export default ServiceProviderRepository;
