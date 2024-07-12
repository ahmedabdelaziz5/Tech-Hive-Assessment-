
import { forgetPasswordInitialValues } from './forgetPasswordData';
import { forgetPasswordValidationSchema } from './forgetPasswordValidationSchema';
import { TextAndLink } from '../../../components/common'
import
{
    FormCard,
    HeaderText,
    Paragraph,
} from '../../../components/ui';
import
{
    Btn,
    Input,
    FormikContainer
} from '../../../components/inputs';

const ForgetPasswordUi = (props) =>
{

    const { handleForgetPassword, isLoadingForgetPassword } = props;

    return (
        <div
            className='height-100vh center-y center-x'
        >
            <FormCard
                size="small"
            >
                <HeaderText>Forget Password</HeaderText>
                <FormikContainer
                    initialValues={forgetPasswordInitialValues}
                    validationSchema={forgetPasswordValidationSchema}
                    onSubmit={handleForgetPassword}
                >
                    <Paragraph >
                        Enter your email and we will send you a
                        password reset code
                    </Paragraph>
                    <Input
                        disabled={isLoadingForgetPassword}
                        type="email"
                        name="email"
                        label="Email" />
                    <Btn
                        disabled={isLoadingForgetPassword}
                        isLoading={isLoadingForgetPassword}
                        type="submit"
                    >
                        Send
                    </Btn>
                </FormikContainer>
                <TextAndLink type="back" />
            </FormCard>
        </div>
    )
}

export default ForgetPasswordUi