import * as yup from 'yup';
import { hashSync } from 'bcrypt';

const createSuperAdminShape = yup.object().shape({
    name: yup
        .string()
        .required('name is a required field')
        .min(2, 'must have at least 2 letters'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('email is a required field')
        .min(2, 'must have at least 2 letters'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required('password is a required field')
        .min(2, 'must have at least 2 letters'),
});

export default createSuperAdminShape;
