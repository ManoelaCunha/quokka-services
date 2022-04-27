import Resident from '../../entities/Resident';
import Condominium from '../../entities/Condominium';
import { UpdateResult, DeleteResult } from 'typeorm';

interface ResidentRepo {
    saveResident: (
        resident: Resident,
        condominium: Condominium,
    ) => Promise<Resident>;
    findResident: () => Promise<Resident[]>;
    findById: (uuid: string) => Promise<Resident>;
    findByEmail: (email: string) => Promise<Resident>;
    updateResident: (
        uuid: string,
        data: Partial<Resident>,
    ) => Promise<UpdateResult>;
    deleteResident: (uuid: string) => Promise<DeleteResult>;
}

export default ResidentRepo;
