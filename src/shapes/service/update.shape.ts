import * as yup from 'yup';

const updateShape = yup.object().shape({
    title: yup.string().strict(),
    description: yup.string().strict(),
});

export default updateShape;
