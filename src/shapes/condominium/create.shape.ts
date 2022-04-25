import * as yup from 'yup';
import bcrypt from 'bcrypt';

const createCondominium = yup.object().shape({
    condominiumName: yup.string().required(),
    zipCode: yup.string().required().min(8).max(8),
    district: yup.string().required(),
    street: yup.string().required(),
    number: yup.number().required(),
    trusteeName: yup.string().required(),
    trusteeEmail: yup.string().email().required(),
    trusteeCpf: yup.string().required().min(11).max(11),
    trusteePassword: yup
        .string()
        .required()
        .transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default createCondominium;
