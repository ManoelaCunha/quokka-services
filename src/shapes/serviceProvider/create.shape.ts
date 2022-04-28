import { hashSync } from 'bcrypt';
import * as yup from 'yup';

const phoneRegex: RegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/g;
const cpfRegex: RegExp = /([0-9]{11})/g;

const createShape = yup.object().shape({
    phone: yup
        .string()
        .matches(
            phoneRegex,
            'phone invalid, the correct format is: (99)999999999!',
        )
        .required('phone is a required field')
        .min(2, 'must have at least 2 letters'),
    socialMedia: yup.string().optional().min(2, 'must have at least 2 letters'),
    name: yup
        .string()
        .required('name is a required field')
        .min(2, 'must have at least 2 letters'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('email is a required field')
        .min(2, 'must have at least 2 letters'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required('password is a required field')
        .min(2, 'must have at least 2 letters'),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!!',
        )
        .required('cpf is a required field')
        .min(2, 'must have at least 2 letters'),
    occupation: yup.string().required().min(2, 'must have at least 2 letters'),
});

export default createShape;
