export const changePasswordInputs = [
    {
        control: "password",
        name: "oldPassword",
        label: "Old Password",
    },
    {
        control: "password",
        name: "newPassword",
        label: "New Password",
    },
    {
        control: "password",
        name: "confirmNewPassword",
        label: "Confirm Password",
    },
];

export const changePasswordInitialValues = {
    "oldPassword": "",
    "newPassword": "",
    "confirmNewPassword": ""
}