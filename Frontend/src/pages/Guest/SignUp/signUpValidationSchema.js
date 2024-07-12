import *  as Yup from 'yup';
import { ageMax, ageMin, emailNotValid, genderNotValid, passwordMatch, passwordMin, required, nationalIdNotValid } from '../../../assets/validationMessages/validationMessages';

export const signUpValidationSchema = Yup.object({
    userName: Yup.string()
        .required(required),
    email: Yup.string()
        .email(emailNotValid)
        .required(required),
    age: Yup.number()
        .min(10, ageMin)
        .max(60, ageMax)
        .required(required),
    gender: Yup.string()
        .matches(/^(male|female)$/, genderNotValid)
        .required(required),
    location: Yup.string()
        .required(required),
    password: Yup.string()
        .min(8, passwordMin)
        .required(required),
    confirmPassword: Yup.string()
        .required(required)
        .min(8, passwordMin)
        .oneOf([Yup.ref("password"), null], passwordMatch),
    nationalId: Yup.string()
        .matches(/^\d{14}$/, nationalIdNotValid)
        .required(required),
});