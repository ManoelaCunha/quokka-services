import * as yup from 'yup';

const loginShape = yup.object().shape({
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
});

export default loginShape;
