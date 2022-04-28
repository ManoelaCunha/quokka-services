import * as yup from 'yup';

const updateCategory = yup.object().shape({
    name: yup.string().min(2, 'must have at least 2 letters'),
});

export default updateCategory;
