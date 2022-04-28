import * as yup from 'yup';
import bcrypt from 'bcrypt';

const cpfRegex: RegExp = /([0-9]{11})/g;

const updateResidentShape = yup.object().shape({
    residentId: yup.string(),
    name: yup.string().min(2, 'must have at least 2 letters'),
    email: yup
        .string()
        .email()
        .lowercase()
        .min(2, 'must have at least 2 letters'),
    password: yup
        .string()
        .transform((pwd) => bcrypt.hashSync(pwd, 10))
        .min(2, 'must have at least 2 letters'),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        )
        .min(2, 'must have at least 2 letters'),
    apartmentBlock: yup.string().min(2, 'must have at least 2 letters'),
    apartmentNumber: yup.number(),
    isAuth: yup.boolean(),
});

export default updateResidentShape;
