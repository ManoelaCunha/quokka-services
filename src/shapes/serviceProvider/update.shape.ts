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
        ),
    socialMedia: yup.string().optional(),
    name: yup.string(),
    email: yup.string().email().lowercase(),
    password: yup.string().transform((pwd) => hashSync(pwd, 10)),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        ),
    occupation: yup.string(),
});

export default updateProviderShape;
