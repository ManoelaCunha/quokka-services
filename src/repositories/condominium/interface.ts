import { UpdateResult } from 'typeorm';
import Condominium from '../../entities/Condominium';

interface ICondominium {
    condominiumId: string;
    condominiumName: string;
    zipCode: string;
    district: string;
    street: string;
    number: number;
    trusteeName: string;
    trusteeEmail: string;
    trusteeCpf: string;
    trusteePassword: string;
}

interface ICondominiumRepository {
    saveCondominium(condominium: ICondominium): Promise<ICondominium>;
    findCondominiums(): Promise<ICondominium[]>;
    findById(condominium_id: string): Promise<ICondominium>;
    findByEmail(condominium_email: string): Promise<ICondominium>;
    updateCondominium(
        uuid: string,
        data: Partial<ICondominium>,
    ): Promise<UpdateResult>;
    deleteCondominium(condominium_id: string): Promise<void>;
}

export { ICondominium, ICondominiumRepository };
