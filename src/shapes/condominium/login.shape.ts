import * as yup from 'yup';

const loginCondominium = yup.object().shape({
    trusteeEmail: yup
        .string()
        .email()
        .required()
        .min(2, 'must have at least 2 letters'),
    trusteePassword: yup
        .string()
        .required()
        .min(2, 'must have at least 2 letters'),
});

export default loginCondominium;
