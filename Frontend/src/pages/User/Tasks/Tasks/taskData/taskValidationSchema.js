import *  as Yup from 'yup';

import
{
    required
} from '../../../../../assets/validationMessages/validationMessages.js';

export const taskValidationSchema = Yup.object({
    title: Yup.string()
        .required(required),
    content: Yup.string(),
    startDate: Yup.date()
        .required(required),
    endDate: Yup.date()
        .required(required),
});