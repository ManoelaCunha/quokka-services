import Service from '../../entities/Service';

interface IServiceRepository {
    saveService(data: Service): Promise<Service>;
    findServices(): Promise<Service[]>;
    findServiceById(uuid: string): Promise<Service>;
    updateService(uuid: string, data: Partial<Service>): Promise<Service>;
    deleteService(uuid: string): Promise<void>;
}

export { IServiceRepository };
