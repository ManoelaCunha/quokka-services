import { Repository, getRepository } from 'typeorm';
import SuperAdmin from '../../entities/SuperAdmin';
import ISuperAdminRepository from './interfaces';

export default class SuperAdminRepository implements ISuperAdminRepository {
    private ormRepository: Repository<SuperAdmin>;

    constructor() {
        this.ormRepository = getRepository(SuperAdmin);
    }

    saveSuperAdmin = async (data: SuperAdmin) =>
        await this.ormRepository.save(data);
    findAll = async () => await this.ormRepository.find();
    findByEmail = async (email) =>
        await this.ormRepository.findOne({ where: { email } });
    updateSuperAdmin = async (uuid: string, data: Partial<SuperAdmin>) =>
        await this.ormRepository.update(uuid, data);
    deleteSuperAdmin = async (uuid: string) =>
        await this.ormRepository.delete(uuid);
}
