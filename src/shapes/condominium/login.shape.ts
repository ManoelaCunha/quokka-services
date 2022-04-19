import * as yup from 'yup';

const loginCondominium = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export default loginCondominium;
