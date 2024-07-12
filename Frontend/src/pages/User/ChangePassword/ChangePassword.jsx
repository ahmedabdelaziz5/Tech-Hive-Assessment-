import ChangePasswordUi from './ChangePasswordUi'
import useHttp from '../../../hooks/use-http';
import { useSnackbar } from 'notistack';
import {  userModulePath } from '../../../config';

const ChangePassword = () =>
{
    const {
        isLoading: isLoadingChangePassword,
        sendRequest: changePassword
    } = useHttp();
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const handleChangePassword = (values, {resetForm}) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                popMessage("Your password changed successfully", { variant: "success" })
                resetForm();
            }
        };
        changePassword(
            {
                url: `${userModulePath}/changePassword`,
                method: "PATCH",
                body: values,
            },
            getResponse
        );
    }

    return (
        <ChangePasswordUi
            handleChangePassword={handleChangePassword}
            isLoadingChangePassword={isLoadingChangePassword}
        />
    )
}

export default ChangePassword