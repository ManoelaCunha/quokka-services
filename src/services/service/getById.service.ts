import Service from '../../entities/Service';

const getByIdService = async (requestedUser: Service) => {
    const resultSchema = Object(requestedUser);

    delete resultSchema.password;
    delete resultSchema.category.categoryId;
    delete resultSchema.resident.password;

    const {
        trusteeCpf,
        trusteePassword,
        residents,
        condominiumServiceProviders,
        ...condominiumData
    } = await requestedUser.resident.condominium;

    const {
        password,
        cpf,
        __condominium__,
        __has_condominium__,
        ...residentData
    } = Object(resultSchema.resident);

    resultSchema['resident'] = residentData;
    resultSchema.resident['condominium'] = condominiumData;

    return resultSchema;
};

export default getByIdService;
