import * as yup from 'yup';
import bcrypt from 'bcrypt';

const updateCondominium = yup.object().shape({
    condominiumId: yup.string(),
    condominiumName: yup.string(),
    zipCode: yup.string().min(8).max(8),
    district: yup.string(),
    street: yup.string(),
    number: yup.number(),
    trusteeName: yup.string(),
    trusteeEmail: yup.string().email(),
    trusteeCpf: yup.string().min(11).max(11),
    trusteePassword: yup.string().transform((pwd) => bcrypt.hashSync(pwd, 10)),
});

export default updateCondominium;
