import { JwtPayload } from 'jsonwebtoken';
import ServiceProvider from '../entities/ServiceProvider';
import SuperAdmin from '../entities/SuperAdmin';
import Resident from '../entities/Resident';
import Condominium from '../entities/Condominium';
import Service from '../entities/Service';
type validatedTypes =
    | ServiceProvider
    | SuperAdmin
    | Resident
    | Condominium
    | Service;

declare global {
    namespace Express {
        interface Request {
            decoded: JwtPayload;
            validated: validatedTypes;
            token: string;
        }
    }
}
