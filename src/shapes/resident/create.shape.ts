import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

const cpfRegex: RegExp = /([0-9]{11})/g;

const createResidentShape = yup.object().shape({
    residentId: yup.string().default(() => v4()),
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
        .required('password is a required field')
        .transform((pwd) => bcrypt.hashSync(pwd, 10))
        .min(2, 'must have at least 2 letters'),
    cpf: yup
        .string()
        .required('cpf is a required field')
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        )
        .min(2, 'must have at least 2 letters'),
    apartmentBlock: yup
        .string()
        .required('apartmentBlock is a required field')
        .min(2, 'must have at least 2 letters'),
    apartmentNumber: yup
        .number()
        .required('apartmentNumber is a required field'),
    isAuth: yup
        .boolean()
        .optional()
        .default(() => false),
});

export default createResidentShape;
