import * as yup from 'yup';

const createShape = yup.object().shape({
    title: yup.string().required('Campo de título obrigatório'),
    description: yup.string().required('Campo de descrição obrigatório'),
});

export default createShape;
