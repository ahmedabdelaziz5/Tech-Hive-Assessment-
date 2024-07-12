import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

import { loginInitialValues, loginInputs } from './loginInputsData'
import { loginValidationSchema } from './loginValidationSchema'
import classes from './Login.module.css'

import
{
    Paragraph,
    HeaderText,
    Logo,
    FormCard,
} from '../../../components/ui';
import
{
    Btn,
    LoopOnInputs,
    FormikContainer,
} from '../../../components/inputs';
import { TextAndLink } from '../../../components/common'

const LoginUi = (props) =>
{
    const {
        handleLogin,
        isLoadingLogin,
    } = props;
    return (
        <div
            className='height-100vh  center-y center-x'
        >
            <FormCard
                size="small"
            >
                <div className={`center-x ${classes.logo}`}>
                    <Logo />
                </div>
                <HeaderText>
                    Login
                </HeaderText>
                <Paragraph>
                    Please, Enter your details
                </Paragraph>
                <FormikContainer
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleLogin}
                >
                    <LoopOnInputs
                        inputs={loginInputs}
                        disabled={isLoadingLogin}
                    />
                    <div
                        className={classes.forgetPasswordContainer}
                    >
                        <Link
                            to={`/forgot-password`}
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Btn
                        type="submit"
                        isLoading={isLoadingLogin}
                    >
                        Login
                    </Btn>
                    <Divider className={classes.divider}>Or</Divider>
                    <TextAndLink type="login" />
                </FormikContainer>
            </FormCard>
        </div>
    )
}

export default LoginUi