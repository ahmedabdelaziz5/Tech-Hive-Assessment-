import *  as Yup from 'yup';
import { emailNotValid, required } from '../../../assets/validationMessages/validationMessages';

export const forgetPasswordValidationSchema = Yup.object({
    email: Yup.string().email(emailNotValid)
        .required(required),
});