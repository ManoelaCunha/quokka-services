import { Response, Request } from 'express';
import { ResidentRepository } from '../../repositories';

const retrieveResidentById = async (req: Request, res: Response) => {
    const { params } = req;
    const { password, ...residentWithoutPassword } =
        await new ResidentRepository().findById(params.id);

    return res.status(200).json(residentWithoutPassword);
};

export default retrieveResidentById;
