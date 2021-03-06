import SuperAdmin from '../../entities/SuperAdmin';
import { UpdateResult, DeleteResult } from 'typeorm';

interface ISuperAdminRepository {
    saveSuperAdmin: (data: SuperAdmin) => Promise<SuperAdmin>;
    findAll: () => Promise<SuperAdmin[]>;
    findById: (id: string) => Promise<SuperAdmin | undefined>;
    findByEmail: (email: string) => Promise<SuperAdmin>;
    updateSuperAdmin: (
        uuid: string,
        data: Partial<SuperAdmin>,
    ) => Promise<UpdateResult>;
    deleteSuperAdmin: (uuid: string) => Promise<DeleteResult>;
}

export default ISuperAdminRepository;
