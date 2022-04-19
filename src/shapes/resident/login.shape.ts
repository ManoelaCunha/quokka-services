import * as yup from 'yup';

const loginResidentShape = yup.object().shape({
    email: yup.string().email().lowercase().required(),
    password: yup.string().required(),
});

export default loginResidentShape;
