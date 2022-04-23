import createSuperAdmin from './superAdmin/create.controller';
import loginSuperAdmin from './superAdmin/login.controller';
import getAllSuperAdmin from './superAdmin/getAll.controller';
import retrieveSuperAdminById from './superAdmin/getById.controller';
import updateSuperAdmin from './superAdmin/update.controller';
import deleteSuperAdmin from './superAdmin/delete.controller';
import createCondomonium from './condominiums/create.controller';
import loginCondominium from './condominiums/login.controller';
import getAllCondominiums from './condominiums/getAll.controller';
import retrieveCondominiumById from './condominiums/getById.controller';
import createCategory from './categories/create.controller';
import getAllCategories from './categories/getAll.controllers';
import getCategoryById from './categories/getById.controller';
import deleteCategory from './categories/delete.controller';
import createResident from './residents/create.controller';
import retrieveResidentById from './residents/getById.controller';

export {
    createSuperAdmin,
    loginSuperAdmin,
    getAllSuperAdmin,
    retrieveSuperAdminById,
    updateSuperAdmin,
    deleteSuperAdmin,
    createCondomonium,
    loginCondominium,
    getAllCondominiums,
    retrieveCondominiumById,
    createCategory,
    getAllCategories,
    getCategoryById,
    deleteCategory,
    createResident,
    retrieveResidentById,
};
