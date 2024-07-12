import { signUpInputs } from './signUpInputsData';
import { signUpValidationSchema } from './signUpValidationSchema';
import { TextAndLink } from '../../../components/common';
import
{
    HeaderText,
    Paragraph,
    FormCard,
    Logo
} from '../../../components/ui';
import
{
    Btn,
    LoopOnInputs,
} from '../../../components/inputs';

import { Form, Formik } from 'formik';
import { Outlet } from 'react-router-dom';

const SignUpUi = (props) =>
{
    const {  handleSignUp, isLoadingSignUp, signupInitialValues } = props;
    return (
        <div
            className='center-x'
        >
            <FormCard
                size="big"
                isSignUp={true}
            >
                <div className={`center-x `}>
                    <Logo />
                </div>
                <HeaderText>
                    Sign Up
                </HeaderText>
                <Paragraph>
                    Connect with a study buddy today
                </Paragraph>
                <Formik
                    initialValues={signupInitialValues}
                    validationSchema={signUpValidationSchema}
                    onSubmit={handleSignUp}
                >
                    {(formik) =>
                        <Form >
                            <LoopOnInputs
                                inputs={signUpInputs}
                                formik={formik}
                                disabled={isLoadingSignUp}
                            />
                            
                            <Btn
                                type="submit"
                                variant="contained"
                                isLoading={isLoadingSignUp}
                                fullWidth
                            >
                                { 'Sign Up' }
                            </Btn>
                        </Form>}
                </Formik>
                <TextAndLink
                    type="signup"
                />
            </FormCard >
            <Outlet />
        </div>
    )
}

export default SignUpUi