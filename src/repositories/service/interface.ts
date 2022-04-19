interface IService {
    serviceId: string;
    title: string;
    description: string;
    status: string;
}

interface IServiceRepository {
    saveService(data: IService): Promise<IService>;
    findServices(): Promise<IService[]>;
    findServiceById(uuid: string): Promise<IService>;
    updateService(uuid: string, data: Partial<IService>): Promise<IService>;
    deleteService(uuid: string): Promise<void>;
}

export { IService, IServiceRepository };
