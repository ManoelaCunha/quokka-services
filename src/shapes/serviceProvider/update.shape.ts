import { hashSync } from 'bcrypt';
import * as yup from 'yup';

const phoneRegex: RegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/g;
const cpfRegex: RegExp = /([0-9]{11})/g;

const updateProviderShape = yup.object().shape({
    phone: yup
        .string()
        .matches(
            phoneRegex,
            'Número de telefone inválido, coloque seu telefone com DDD, digite 9 e seu número sem traços!',
        ),
    socialMedia: yup.string().optional(),
    name: yup.string(),
    email: yup.string().email().lowercase(),
    password: yup.string().transform((pwd) => hashSync(pwd, 10)),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'Cpf com formato inválido, verifique o dado e tente novamente!',
        ),
    occupation: yup.string(),
});

export default updateProviderShape;
