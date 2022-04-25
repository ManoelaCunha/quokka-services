import { Repository, getRepository } from 'typeorm';
import Resident from '../../entities/Resident';
import ResidentRepo from './interfaces';

class ResidentRepository implements ResidentRepo {
    private ormRepository: Repository<Resident>;

    constructor() {
        this.ormRepository = getRepository(Resident);
    }

    saveResident = async (resident: Resident) =>
        await this.ormRepository.save(resident);
    findResident = async () => await this.ormRepository.find();
    findById = async (uuid: string) => {
        return await this.ormRepository.findOne({
            where: { residentId: uuid },
        });
    };
    findByEmail = async (email: string) => {
        return await this.ormRepository.findOne({ where: { email } });
    };
    updateResident = async (uuid: string, data: Partial<Resident>) => {
        return await this.ormRepository.update(uuid, data);
    };
    deleteResident = async (uuid: string) =>
        await this.ormRepository.delete(uuid);
}

export default ResidentRepository;
