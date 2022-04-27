import { Response, Request } from 'express';
import { ResidentRepository } from '../../repositories';

const retrieveResidentById = async (req: Request, res: Response) => {
    const { params } = req;
    const resident = await new ResidentRepository().findById(params.id);

    const { __condominium__, __has_condominium__, password, ...rest } =
        Object(resident);

    const resultSchema = { ...rest };

    if (resident.isAuth) {
        const condominium = await resident.condominium;

        resultSchema['condominium'] = condominium;
    }

    return res.status(200).json(resultSchema);
};

export default retrieveResidentById;
