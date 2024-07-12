import *  as Yup from 'yup';
import { passwordMatch, passwordMin, required } from '../../../assets/validationMessages/validationMessages';

export const resetPasswordValidationSchema = Yup.object({
    password: Yup.string()
        .min(8, passwordMin)
        .required(required),
    confirmPassword: Yup.string()
        .required(required)
        .min(8, passwordMin)
        .oneOf([Yup.ref("password"), null], passwordMatch),
});