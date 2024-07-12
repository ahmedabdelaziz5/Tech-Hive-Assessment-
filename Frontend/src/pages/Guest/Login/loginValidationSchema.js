import *  as Yup from 'yup';
import {  passwordMin, required } from '../../../assets/validationMessages/validationMessages';

export const loginValidationSchema = Yup.object({
    userName: Yup.string()
        .required(required),
    password: Yup.string()
        .min(8, passwordMin)
        .required(required),
});