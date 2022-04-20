import { SuperAdminRepository } from '../../repositories';

const getAllSuperAdminService = async (): Promise<object[]> => {
    const superAdmins = await new SuperAdminRepository().findAll();

    const newSuperAdmins: Array<object> = [];

    superAdmins.map((user) => {
        const { superAdminId, name, email } = user;
        newSuperAdmins.push({ superAdminId, name, email });
    });

    return newSuperAdmins;
};

export default getAllSuperAdminService;
