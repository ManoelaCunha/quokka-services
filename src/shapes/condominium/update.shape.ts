import * as yup from 'yup';
import bcrypt from 'bcrypt';

const updateCondominium = yup.object().shape({
    condominiumId: yup.string(),
    condominiumName: yup.string().min(2, 'must have at least 2 letters'),
    zipCode: yup.string().min(8).max(8),
    district: yup.string().min(2, 'must have at least 2 letters'),
    street: yup.string().min(2, 'must have at least 2 letters'),
    number: yup.number(),
    trusteeName: yup.string().min(2, 'must have at least 2 letters'),
    trusteeEmail: yup.string().email().min(2, 'must have at least 2 letters'),
    trusteeCpf: yup.string().min(11).max(11),
    trusteePassword: yup
        .string()
        .transform((pwd) => bcrypt.hashSync(pwd, 10))
        .min(2, 'must have at least 2 letters'),
});

export default updateCondominium;
