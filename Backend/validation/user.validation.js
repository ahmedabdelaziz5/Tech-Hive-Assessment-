const joi = require("joi");

module.exports = {

    signUpValid: {
        body: joi.object().required().keys({

            userName: joi.string().required().messages({
                "string.empty": "User name can't be empty",
                "any.required": "User name is required"
            }),

            email: joi.string().email().required().messages({
                "string.empty": "Email can't be empty",
                "any.required": "Email is required"
            }),

            age: joi.number().required().messages({
                "string.empty": "Age can't be empty",
                "any.required": "Age is required"
            }),

            gender: joi.string().valid('male', 'female').required().messages({
                "string.empty": "Gender can't be empty",
                "any.required": "Gender is required",
                "any.only": "Gender must be either 'male' or 'female'"
            }),

            location: joi.string().required().messages({
                "string.empty": "Location can't be empty",
                "any.required": "Location is required"
            }),

            nationalId: joi.string().required().messages({
                "string.empty": "National Id can't be empty",
                "any.required": "National Id is required"
            }),

            password: joi.string().required().messages({
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string"
            }),

            confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
            }),

        }),
    },

    loginValid: {

        body: joi.object().required().keys({

            userName: joi.string().required().messages({
                "string.empty": "User name can't be empty",
                "any.required": "User name is required"
            }),

            password: joi.string().required().messages({
                "string.empty": "Password can't be empty",
                "any.required": "Password is required"
            }),

        }),
    },

    forgetPasswordValid: {

        body: joi.object().required().keys({

            email: joi.string().email().required().messages({
                "string.empty": "Email can't be empty",
                "string.required": "Email is required",
            }),

        }),
    },

    submitNewPasswordValid: {

        body: joi.object().required().keys({

            password: joi.string().required().messages({
                "string.empty": "Password can't be empty",
                "any.required": "Password is required",
                "any.base": "Password must be a string"
            }),

            confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
            }),

        }),
    },

    changePasswordValid: {

        body: joi.object().required().keys({

            oldPassword: joi.string().required().messages({
                "string.empty": "Old Password can't be empty",
                "any.required": "Old Password is required",
                "any.base": "Old Password must be a string"
            }),
            newPassword: joi.string().required().invalid(joi.ref('oldPassword')).messages({
                "string.empty": "New Password can't be empty",
                "any.required": "New Password is required",
                "any.invalid": "new password should not equal to old password",
                "any.base": "New Password must be a string"
            }),
            confirmNewPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
                "string.empty": "Confirm password can't be empty",
                "any.required": "Confirm password is required",
                "any.only": "Confirm password must match the password",
                "any.base": "Confirm password must be a string"
            }),

        }),
    },

    editProfileValid: {

        body: joi.object().required().keys({

            userName: joi.string(),
            email: joi.string().email(),

        }),
    },

    changeProfileImageValid: {
        body: joi.object().required().keys({

            type: joi.string().required().valid('upload', 'remove').messages({
                "string.empty": "Media type can't be empty",
                "any.required": "Media type is required",
                "any.base": "Media type must be a string",
                "any.only": "Media type must be either ['upload' or 'remove'] "
            }),

        }),
    },

    resendVerificationEmailValid: {
        query: joi.object().required().keys({
            email: joi.string().email().required().messages({
                "string.empty": "email can't be empty",
                "any.required": "email is required",
                "string.email": "email must be a valid email address",
                "any.base": "email must be a string"
            }),
        }),
    },

};