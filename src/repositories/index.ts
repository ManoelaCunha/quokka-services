import {
    CondominiumRepository,
    ICondominiumRepository,
} from './condominium/repository';
import {
    CategoryRepository,
    ICategoryRepository,
} from './categories/repository';

import ResidentRepository from './resident/repository';
import ServiceProviderRepository from './serviceProvider/repository';

import { ServiceRepository } from './service/repository';
import ISuperAdminRepository from './superAdmin/interfaces';
import SuperAdminRepository from './superAdmin/repository';

export {
    CondominiumRepository,
    ICondominiumRepository,
    CategoryRepository,
    ICategoryRepository,
    ResidentRepository,
    ServiceProviderRepository,
    ServiceRepository,
    SuperAdminRepository,
    ISuperAdminRepository,
};
