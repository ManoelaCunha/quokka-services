import * as yup from 'yup';

const loginResidentShape = yup.object().shape({
    email: yup
        .string()
        .email()
        .lowercase()
        .required()
        .min(2, 'must have at least 2 letters'),
    password: yup.string().required().min(2, 'must have at least 2 letters'),
});

export default loginResidentShape;
