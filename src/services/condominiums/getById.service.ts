import Condominium from '../../entities/Condominium';
import ServiceProvider from '../../entities/ServiceProvider';

const getCondominiumByIdService = async (
    condominium: Partial<Condominium>,
): Promise<Partial<ServiceProvider[]>> => {
    let newResidents = [];
    condominium.residents.forEach((resident) => {
        const { password, ...residentInfo } = resident;
        if (residentInfo.isAuth) {
            newResidents.push(residentInfo);
        }
    });

    condominium.residents = newResidents;
    const servicesProviders = [];
    await Promise.all(
        condominium.condominiumServiceProviders.map(async (relation) => {
            const { condominiumServiceProviders, password, ...rest } =
                await relation.serviceProvider;

            rest['isApproved'] = relation.isApproved;
            servicesProviders.push(rest);
        }),
    );

    return servicesProviders;
};

export default getCondominiumByIdService;
