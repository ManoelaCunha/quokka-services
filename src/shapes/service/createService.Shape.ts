import * as yup from 'yup';

const createServiceShape = yup.object().shape({
    title: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
});

export default createServiceShape;
