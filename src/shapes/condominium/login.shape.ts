import * as yup from 'yup';

const loginCondominium = yup.object().shape({
    trusteeEmail: yup.string().email().required(),
    trusteePassword: yup.string().required(),
});

export default loginCondominium;
