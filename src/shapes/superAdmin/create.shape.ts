import * as yup from 'yup';
import { hashSync } from 'bcrypt';

const createSuperAdminShape = yup.object().shape({
    name: yup.string().required('Campo de nome obrigatório'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('Campo de email obrigatório'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required('Campo de senha obrigatório'),
});

export default createSuperAdminShape;
