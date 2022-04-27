import { Repository, getRepository, UpdateResult } from 'typeorm';

import Condominium from '../../entities/Condominium';
import { ICondominiumRepository } from './interface';

class CondominiumRepository implements ICondominiumRepository {
    private ormRepository: Repository<Condominium>;

    constructor() {
        this.ormRepository = getRepository(Condominium);
    }

    saveCondominium = async (
        condominium: Condominium,
    ): Promise<Condominium> => {
        return await this.ormRepository.save(condominium);
    };

    findCondominiums = async (): Promise<Condominium[]> => {
        return await this.ormRepository.find();
    };

    findById = async (condominium_id: string): Promise<Condominium> => {
        return await this.ormRepository.findOne(condominium_id);
    };

    findByEmail = async (condominium_email: string): Promise<Condominium> => {
        return await this.ormRepository.findOne({
            where: { trusteeEmail: condominium_email },
        });
    };

    updateCondominium = async (
        uuid: string,
        data: Partial<Condominium>,
    ): Promise<UpdateResult> => {
        return await this.ormRepository.update(uuid, data);
    };

    deleteCondominium = async (condominium_id: string): Promise<void> => {
        await this.ormRepository.delete(condominium_id);
    };
}

export { CondominiumRepository, ICondominiumRepository };
