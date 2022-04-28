import * as yup from 'yup';

const createShape = yup.object().shape({
    title: yup
        .string()
        .required('title is a required field')
        .min(2, 'must have at least 2 letters'),
    description: yup
        .string()
        .required('description is a required field')
        .min(2, 'must have at least 2 letters'),
});

export default createShape;
