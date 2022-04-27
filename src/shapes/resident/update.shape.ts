import * as yup from 'yup';
import bcrypt from 'bcrypt';

const cpfRegex: RegExp = /([0-9]{11})/g;

const updateResidentShape = yup.object().shape({
    residentId: yup.string(),
    name: yup.string(),
    email: yup.string().email().lowercase(),
    password: yup.string().transform((pwd) => bcrypt.hashSync(pwd, 10)),
    cpf: yup
        .string()
        .matches(
            cpfRegex,
            'invalid format on cpf field, verify and send again!',
        ),
    apartmentBlock: yup.string(),
    apartmentNumber: yup.number(),
    isAuth: yup.boolean(),
});

export default updateResidentShape;
