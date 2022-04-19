import * as yup from 'yup';

const createCondominium = yup.object().shape({
    condominium_name: yup.string().required(),
    zip_code: yup.string().required().min(8).max(8),
    district: yup.string().required(),
    street: yup.string().required(),
    number: yup.number().required(),
    trustee_name: yup.string().required(),
    trustee_email: yup.string().email().required(),
    trustee_cpf: yup.string().required().min(11).max(11),
    trustee_password: yup.string().required(),
});

export default createCondominium;
