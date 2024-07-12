import React, { useState } from 'react'
import { Modal } from '@mui/material'
import { FormCard, HeaderText, Paragraph } from '../../../components/ui';
import { Btn } from '../../../components/inputs';
import resendEmailBackground from '../../../assets/images/resendEmailBackground.png'
import classes from './ResendEmailUi.module.css'
import { useNavigate } from 'react-router-dom';
const ResendEmailUi = (props) =>
{
    const {
        email,
        handleResendEmail,
        isLoadingResendEmail,
        sentAgain,
    } = props;
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const onClose = () =>
    {
        setOpen(false)
        navigate("/login")
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            className='center-x center-y'
        >
            <>
                <FormCard
                    size={"big"}
                >
                    <div
                        className="center-x"
                    >
                        <div
                            className={`${classes.content} center-text`}
                        >
                            <img src={resendEmailBackground} alt="Resend Email Background" />
                            <HeaderText>Check Your Email</HeaderText>
                            <Paragraph>
                                We have send a verification email to your email
                                <br />
                                {email}
                            </Paragraph>
                            <Btn
                                onClick={handleResendEmail}
                                isLoading={isLoadingResendEmail}
                            >
                                {sentAgain ? "Send Again" : "Resend Email"}
                            </Btn>
                        </div>
                    </div>
                </FormCard>
            </>

        </Modal>
    )
}

export default ResendEmailUi