import { v4 } from 'uuid';
import * as yup from 'yup';
import bcrypt from 'bcrypt';

const cpfRegex: RegExp = /([0-9]{11})/g;

const createResidentShape = yup.object().shape({
    residentId: yup.string().default(() => v4()),
    name: yup.string().required('name is a required field'),
    email: yup
        .string()
        .email()
        .lowercase()
        .required('email is a required field'),
    password: yup
        .string()
        .required('password is a required field')
        .transform((pwd) => bcrypt.hashSync(pwd, 10)),
    cpf: yup
        .string()
        .required('cpf is a required field')
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        ),
    apartmentBlock: yup.string().required('apartmentBlock is a required field'),
    apartmentNumber: yup
        .number()
        .required('apartmentNumber is a required field'),
    isAuth: yup
        .boolean()
        .optional()
        .default(() => false),
});

export default createResidentShape;
