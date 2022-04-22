import Resident from '../../entities/Resident';
import { UpdateResult, DeleteResult } from 'typeorm';

export interface IResident {
    isAuth: boolean;
    apartmentNumber: number;
    apartmentBlock: string;
    cpf: string;
    email: string;
    name: string;
    password?: string;
    residentId?: string;
}

interface ResidentRepo {
    saveResident: (resident: Resident) => Promise<Resident>;
    findResident: () => Promise<Resident[]>;
    findResidentById: (uuid: string) => Promise<Resident>;
    findByEmail: (email: string) => Promise<Resident>;
    updateResident: (
        uuid: string,
        data: Partial<Resident>,
    ) => Promise<UpdateResult>;
    deleteResident: (uuid: string) => Promise<DeleteResult>;
}

export default ResidentRepo;
