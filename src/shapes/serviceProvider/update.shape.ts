import { hashSync } from 'bcrypt';
import * as yup from 'yup';

const phoneRegex: RegExp =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}$/g;
const cpfRegex: RegExp = /([0-9]{11})/g;

const updateProviderShape = yup.object().shape({
    phone: yup
        .string()
        .matches(
            phoneRegex,
            'phone invalid, the correct format is: (99)999999999!',
        )
        .min(2, 'must have at least 2 letters'),
    socialMedia: yup.string().optional().min(2, 'must have at least 2 letters'),
    name: yup.string().min(2, 'must have at least 2 letters'),
    email: yup
        .string()
        .email()
        .lowercase()
        .min(2, 'must have at least 2 letters'),
    password: yup
        .string()
        .transform((pwd) => hashSync(pwd, 10))
        .min(2, 'must have at least 2 letters'),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        )
        .min(2, 'must have at least 2 letters'),
    occupation: yup.string().min(2, 'must have at least 2 letters'),
});

export default updateProviderShape;
