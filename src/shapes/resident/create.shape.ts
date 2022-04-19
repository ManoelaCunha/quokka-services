import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

const cpfRegex: RegExp = /([0-9]{11})/g;

const createResidentShape = yup.object().shape({
    residentId: yup.string().default(() => v4()),
    name: yup.string().required('Campo de name obrigatório'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('Campo de email obrigatório'),
    password: yup
        .string()
        .required('Campo de password obrigatório')
        .transform((pwd) => bcrypt.hashSync(pwd, 10)),
    cpf: yup
        .string()
        .required('Campo de cpf obrigatório')
        .matches(
            cpfRegex,
            'Cpf com formato inválido, verifique o dado e tente novamente!',
        ),
    apartmentBlock: yup
        .string()
        .required('Campo de apartmentBlock obrigatório'),
    apartmentNumber: yup
        .number()
        .required('Campo de apartmentNumber obrigatório'),
    isAuth: yup
        .boolean()
        .optional()
        .default(() => false),
});

export default createResidentShape;
