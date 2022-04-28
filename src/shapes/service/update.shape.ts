import * as yup from 'yup';

const updateShape = yup.object().shape({
    title: yup.string().strict().min(2, 'must have at least 2 letters'),
    description: yup.string().strict().min(2, 'must have at least 2 letters'),
});

export default updateShape;
