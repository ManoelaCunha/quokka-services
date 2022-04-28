import * as yup from 'yup';
import { hashSync } from 'bcrypt';

const updateSuperAdminShape = yup.object().shape({
    name: yup.string().min(2, 'must have at least 2 letters'),
    email: yup
        .string()
        .email()
        .lowercase()
        .min(2, 'must have at least 2 letters'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .min(2, 'must have at least 2 letters'),
});

export default updateSuperAdminShape;
