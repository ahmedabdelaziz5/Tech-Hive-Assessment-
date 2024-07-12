import *  as Yup from 'yup';
import
{
    passwordMatch,
    passwordMin,
    required
} from '../../../assets/validationMessages/validationMessages';

export const changePasswordValidationSchema = Yup.object({
    oldPassword: Yup.string()
        .required(required),
    newPassword: Yup.string()
        .min(8, passwordMin)
        .required(required),
    confirmNewPassword: Yup.string()
        .required(required)
        .min(8, passwordMin)
        .oneOf([Yup.ref("newPassword"), null], passwordMatch),
});