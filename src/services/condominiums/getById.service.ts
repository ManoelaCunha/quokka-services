import Condominium from '../../entities/Condominium';

const getCondominiumByIdService = async (
    condominium: Partial<Condominium>,
): Promise<Partial<Condominium>> => {
    let newResidents = [];
    condominium.residents.forEach((resident) => {
        const { password, ...residentInfo } = resident;
        if (residentInfo.isAuth) {
            newResidents.push(residentInfo);
        }
    });

    condominium.residents = newResidents;

    const servicesProviders = [];
    condominium.condominiumServiceProviders.forEach(
        (condominiumServiceProvider) => {
            if (condominiumServiceProvider.isApproved) {
                delete condominiumServiceProvider.serviceProvider.password;
                servicesProviders.push(
                    condominiumServiceProvider.serviceProvider,
                );
            }
        },
    );

    condominium.condominiumServiceProviders = servicesProviders;

    return condominium;
};

export default getCondominiumByIdService;
