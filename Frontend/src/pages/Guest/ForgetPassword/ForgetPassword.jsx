import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

import useHttp from "../../../hooks/use-http";
import ForgetPasswordUi from "./ForgetPasswordUi"
import {  userModulePath } from "../../../config";

const ForgetPassword = (props) =>
{
    const {
        isLoading: isLoadingForgetPassword,
        sendRequest: forgetPassword
    } = useHttp();
    const navigate = useNavigate();
    const { enqueueSnackbar: popMessage } = useSnackbar();
    const { userType } = useParams();

    const handleForgetPassword = (values) =>
    {
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                popMessage("Please check your email", { variant: "success" })
                navigate(`${userType}/login`)
            }
        };

        forgetPassword(
            {
                url: `${userModulePath }/forgetPassword`,
                method: "POST",
                body: values,
            },
            getResponse
        );
    }

    return (
        <ForgetPasswordUi
            handleForgetPassword={handleForgetPassword}
            isLoadingForgetPassword={isLoadingForgetPassword}
        />
    )
}

export default ForgetPassword