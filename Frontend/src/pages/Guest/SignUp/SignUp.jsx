import { useNavigate } from 'react-router-dom';

import useHttp from '../../../hooks/use-http';
import SignUpUi from './SignUpUi';
import { userModulePath } from '../../../config';
import { signUpInitialValues } from './signUpInputsData';

const SignUp = () =>
{
    const navigate = useNavigate();

    const {
        isLoading: isLoadingSignUp,
        sendRequest: signUp
    } = useHttp();

    const cleanData = (values) =>
    {
        let submitData = { ...values };
        return submitData
    }

    const handleSignUpForUser = (values, { resetForm }) =>
    {
        const submitData = cleanData(values)
        const getResponse = ({ message }) =>
        {
            if (message.toLowerCase().includes("success"))
            {
                resetForm();
                navigate(`resend-email?email=${values.email}`)
            }
        };
        signUp(
            {
                url: `${userModulePath}/signUp`,
                method: "POST",
                body: submitData,
            },
            getResponse
        );
    }

    return (
        <SignUpUi
            signupInitialValues={ signUpInitialValues }
            isLoadingSignUp={isLoadingSignUp}
            handleSignUp={handleSignUpForUser }
        />
    )
}

export default SignUp