// object that holds all the messages/parameters which is sent in emails

const emailTemplate = {
    from: "Hivo Team",
    verificationMail: {
        subject: "Verify your account",
        text: "Please click the verify button to verify your account",
    },
    forgetPasswordEmail: {
        subject: "Forget password access",
        text: "Please click the button to reset your account password",
    },
};

module.exports = emailTemplate;