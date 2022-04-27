import * as yup from 'yup';
import { hashSync } from 'bcrypt';

const createSuperAdminShape = yup.object().shape({
    name: yup.string().required('name is a required field'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('email is a required field'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required('password is a required field'),
});

export default createSuperAdminShape;
