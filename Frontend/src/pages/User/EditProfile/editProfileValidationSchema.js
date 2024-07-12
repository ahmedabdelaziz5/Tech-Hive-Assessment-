import *  as Yup from 'yup';
import
{
    ageMax,
    ageMin,
    emailNotValid,
    required
} from '../../../assets/validationMessages/validationMessages';

export const editProfileValidationSchema = Yup.object({
    userName: Yup.string()
        .required(required),
    email: Yup.string()
        .email(emailNotValid)
        .required(required),
    age: Yup.number()
        .min(10, ageMin)
        .max(60, ageMax)
        .required(required),
});