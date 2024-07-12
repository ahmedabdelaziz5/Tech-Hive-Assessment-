import React, { useState } from 'react'
import ResendEmailUi from './ResendEmailUi'
import { useSearchParams } from 'react-router-dom';
import useHttp from '../../../hooks/use-http';
import { useSnackbar } from 'notistack';
import { userModulePath } from '../../../config';

const ResendEmail = () =>
{
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const {
        isLoading: isLoadingResendEmail,
        sendRequest: resendEmail
    } = useHttp();
    const { enqueueSnackbar: popMessage } = useSnackbar();

    const [sentAgain, setSentAgain] = useState(false)

    const handleResendEmail = () =>
    {
        const getResponse = ({ message }) =>
        {
            if (message.includes("success"))
            {
                popMessage("Email sent successfully", { variant: "success" })
                if (!sentAgain) setSentAgain(true)
            }
        };

        resendEmail(
            {
                url: `${userModulePath}/resendVerificationEmail?email=${email}`,
                method: "GET",
            },
            getResponse
        );
    }
    return (
        <ResendEmailUi
            email={email}
            handleResendEmail={handleResendEmail}
            isLoadingResendEmail={isLoadingResendEmail}
            sentAgain={sentAgain}
        />
    )
}

export default ResendEmail