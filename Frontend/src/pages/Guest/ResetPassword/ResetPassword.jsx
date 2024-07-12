import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import useHttp from "../../../hooks/use-http";
import ResetPasswordUi from "./ResetPasswordUi"
import { useSnackbar } from "notistack";
import {  userModulePath } from "../../../config";

const ResetPassword = (props) =>
{
    const {
        isLoading: isLoadingResetPassword,
        sendRequest: resetPassword
    } = useHttp();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const handleResetPassword = (values) =>
    {
        const token = new createSearchParams(searchParams).get("token");
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                popMessage("Password changed successfully", { variant: "success" })
                navigate("/login")
            }
        };

        resetPassword(
            {
                url: `${ userModulePath }/submitNewPassword?token=${token}`,
                method: "POST",
                body: values,
            },
            getResponse
        );
    }

    return (
        <ResetPasswordUi
            handleResetPassword={handleResetPassword}
            isLoadingResetPassword={isLoadingResetPassword}
        />
    )
}

export default ResetPassword