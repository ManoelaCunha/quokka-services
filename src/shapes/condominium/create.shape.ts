import * as yup from 'yup';
import bcrypt from 'bcrypt';

const createCondominium = yup.object().shape({
    condominiumName: yup
        .string()
        .required()
        .min(2, 'must have at least 2 letters'),
    zipCode: yup.string().required().min(8).max(8),
    district: yup.string().required().min(2, 'must have at least 2 letters'),
    street: yup.string().required().min(2, 'must have at least 2 letters'),
    number: yup.number().required(),
    trusteeName: yup.string().required().min(2, 'must have at least 2 letters'),
    trusteeEmail: yup
        .string()
        .email()
        .required()
        .min(2, 'must have at least 2 letters'),
    trusteeCpf: yup.string().required().min(11).max(11),
    trusteePassword: yup
        .string()
        .required()
        .transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default createCondominium;
