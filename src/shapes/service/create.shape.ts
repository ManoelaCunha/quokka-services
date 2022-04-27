import * as yup from 'yup';

const createShape = yup.object().shape({
    title: yup.string().required('title is a required field'),
    description: yup.string().required('description is a required field'),
});

export default createShape;
