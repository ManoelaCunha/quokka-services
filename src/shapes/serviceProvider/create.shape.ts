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
        .required('phone is a required field'),
    socialMedia: yup.string().optional(),
    name: yup.string().required('name is a required field'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('email is a required field'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .required('password is a required field'),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!!',
        )
        .required('cpf is a required field'),
    occupation: yup.string().required(),
});

export default createShape;
