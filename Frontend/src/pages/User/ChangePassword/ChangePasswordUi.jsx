import { SideBar } from '../../../components/common/SideBar'
import { Btn, FormikContainer, LoopOnInputs } from '../../../components/inputs'
import { changePasswordInitialValues, changePasswordInputs } from './changePasswordData'
import { changePasswordValidationSchema } from './changePasswordValidationSchema'
import Card from '../EditProfile/Card'
import editProfileClasses from '../EditProfile/styles/EditProfileUi.module.css'
const ChangePasswordUi = (props) =>
{
    const {
        isLoadingChangePassword,
        handleChangePassword
    } = props;

    return (
        <div
            className={editProfileClasses.container}
        >
            <SideBar />

            <div
                className={editProfileClasses.data}
            >
                <FormikContainer
                    initialValues={changePasswordInitialValues}
                    validationSchema={changePasswordValidationSchema}
                    onSubmit={handleChangePassword}
                >
                    <Card
                        title="Change Password"
                    >
                        <div
                            style={{ maxWidth: '400px' }}
                        >
                            <LoopOnInputs
                                inputs={changePasswordInputs}
                                disabled={isLoadingChangePassword}
                            />
                        </div>

                        <div
                            className={editProfileClasses.action}
                        >
                            <Btn
                                type="submit"
                                isLoading={isLoadingChangePassword}
                            >
                                Update Password
                            </Btn>
                        </div>
                    </Card>
                </FormikContainer>
            </div>
        </div>
    )
}

export default ChangePasswordUi