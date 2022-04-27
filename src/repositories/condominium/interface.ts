import { UpdateResult } from 'typeorm';
import Condominium from '../../entities/Condominium';
interface ICondominiumRepository {
    saveCondominium(condominium: Condominium): Promise<Condominium>;
    findCondominiums(): Promise<Condominium[]>;
    findById(condominium_id: string): Promise<Condominium>;
    findByEmail(condominium_email: string): Promise<Condominium>;
    updateCondominium(
        uuid: string,
        data: Partial<Condominium>,
    ): Promise<UpdateResult>;
    deleteCondominium(condominium_id: string): Promise<void>;
}

export { ICondominiumRepository };
