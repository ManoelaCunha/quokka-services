import { hashSync } from 'bcrypt';
import * as yup from 'yup';

const phoneRegex: RegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/g;
const cpfRegex: RegExp = /([0-9]{11})/g;

const createShape = yup.object().shape({
    phone: yup
        .string()
        .matches(
            phoneRegex,
            'Número de telefone inválido, coloque seu telefone com DDD, digite 9 e seu número sem traços!',
        )
        .required('Campo de telefone obrigatório'),
    social_media: yup.string().optional(),
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
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'Cpf com formato inválido, verifique o dado e tente novamente!',
        )
        .required('Campo de cpf obrigatório'),
});

export default createShape;
