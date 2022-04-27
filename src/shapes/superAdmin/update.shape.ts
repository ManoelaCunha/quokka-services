import * as yup from 'yup';
import { hashSync } from 'bcrypt';

const updateSuperAdminShape = yup.object().shape({
    name: yup.string(),
    email: yup.string().email().lowercase(),
    password: yup.string().transform((pwd) => hashSync(pwd, 10)),
});

export default updateSuperAdminShape;
