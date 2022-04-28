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

    await condominium.condominiumServiceProviders;

    await Promise.all(
        condominium.condominiumServiceProviders.map(async (item) => {
            const serviceProvider = await item.serviceProvider;
            const { password, condominiumServiceProviders, ...rest } =
                serviceProvider;
            servicesProviders.push({ ...rest, isApproved: item.isApproved });
        }),
    );

    console.log(servicesProviders);

    condominium.condominiumServiceProviders = servicesProviders;

    return condominium;
};

export default getCondominiumByIdService;
