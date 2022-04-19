import Resident from '../../entities/Resident';
import { UpdateResult, DeleteResult } from 'typeorm';

interface ResidentRepo {
    saveResident: (resident: Resident) => Promise<Resident>;
    findResident: () => Promise<Resident[]>;
    findResidentById: (uuid: string) => Promise<Resident>;
    findResidentByEmail: (email: string) => Promise<Resident>;
    updateResident: (
        uuid: string,
        item: Partial<Resident>,
    ) => Promise<UpdateResult>;
    deleteResident: (uuid: string) => Promise<DeleteResult>;
}

export default ResidentRepo;
