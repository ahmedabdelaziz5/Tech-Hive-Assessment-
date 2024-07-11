const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepo = require('../models/user/user.repo');
const { setUpMails } = require('../helpers/sendEmail');
const { removeImageFromCloudinary, uploadImageToCloudinary } = require('../utils/uploadImageToCloudinary');

// function that allows user to sign up
exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
        let user = await userRepo.isExist(
            {
                $or: [
                    { userName: userData.userName },
                    { email: userData.email },
                    { nationalId: userData.nationalId }
                ]
            },
            '_id'
        );
        if (user.success) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let addUserPromise = await userRepo.createUser(userData);
        let verificationMailPromise = await setUpMails("verificationMail", { email: userData.email });
        let result = await Promise.all([addUserPromise, verificationMailPromise]);
        if (!result[0].success || !result[1].success) {
            return res.status(417).json({
                message: "unexpected error !"
            });
        }
        return res.status(200).json({
            message: "Success and verification email was sent !"
        });

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't add your account, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to login
exports.login = async (req, res) => {
    try {
        const userData = req.body;
        let user = await userRepo.isExist({ userName: userData.userName });
        if (!user.success) {
            return res.status(user.statusCode).json({
                success: false,
                message: user.message,
            });
        }
        if (!user.data.isVerified) {
            return res.status(400).json({
                success: false,
                message: "your account is not verified, please verify your account first !",
            });
        }
        let passwordMatch = await bcrypt.compare(userData.password, user.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "wrong password !",
            });
        }
        let token = jwt.sign({
            id: user.data._id,
            userName: user.data.userName,
            email: user.data.email,
        }, process.env.SECRET_JWT);
        delete user.data.password;
        return res.status(200).json({
            message: "success",
            token: token,
            data: user.data,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't login, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const select = '-password'
        let user = await userRepo.isExist(
            { _id: req.user.id },
            select
        );
        if (user.success) {
            user.statusCode = 200;
            user.message = "success";
        }
        return res.status(user.statusCode).json(user);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your profile !",
            error: "Unexpected Error !"
        });
    }
};

// blackBox function that allows make user verified
exports.verifyAccount = async (req, res) => {
    try {
        let { token } = req.query;
        let decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        let user = await userRepo.updateUser({ email: decodedToken.email }, { isVerified: true });
        if (!user.success) {
            return res.status(400).send('there is no such email , please register first');
        }
        return res.status(200).send("your account was verified successfully !")
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't verify your account !",
            error: "Unexpected Error !"
        });
    }

};

// function that re-sends a verification email
exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await userRepo.isExist({ email }, 'email isVerified');
        if (!user.success) return res.status(user.statusCode).json(user);
        if (user.data.isVerified) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "your account is already verified !"
            });
        }
        let emailUser = await setUpMails("verificationMail", { email: email });
        return res.status(emailUser.statusCode).json(emailUser);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't resend verification email, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to reset his password
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let userMatch = await userRepo.isExist({ email });
        if (!userMatch.success) {
            return res.status(userMatch.statusCode).json({
                success: false,
                message: userMatch.message,
            });
        }
        const sendEmail = await setUpMails("forgetPasswordEmail", { email });
        return res.status(sendEmail.statusCode).json({
            message: sendEmail.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't reset your password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to submit his new password from forget password email
exports.submitNewPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password not match !"
            });
        }
        let decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        let newPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        let user = await userRepo.updateUser({ email: decodedToken.email }, { password: newPassword });
        user.success ? delete user.data.password : 0;
        return res.status(user.statusCode).json(user);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't updating you password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to change his password inside the app
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await userRepo.isExist({ _id: req.user.id }, '_id password');
        if (!user.success) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let passwordMatch = await bcrypt.compare(oldPassword, user.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "wrong password !"
            });
        }
        let newHashedPassword = await bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS));
        let updateUser = await userRepo.updateUser({ _id: req.user.id }, { password: newHashedPassword });
        return res.status(updateUser.statusCode).json({
            message: updateUser.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't change your password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to edit his profile data 
exports.editProfile = async (req, res) => {
    try {
        const userData = req.body;
        const userId = req.user.id;
        const user = await userRepo.updateUser({ _id: userId }, userData);
        user.success ? delete user.data.password : 0;
        return res.status(user.statusCode).json(user);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't edit your profile, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to change his profile image ( takes the type of operation upload/remove )
exports.changeProfileImage = async (req, res) => {
    try {
        const { type } = req.body;
        let result;
        if (type === "upload") {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    statusCode: 400,
                    message: "Can't read media file !"
                });
            }
            result = await uploadImageToCloudinary(req.file.path, req.user.id, "users images");
        }
        else result = await removeImageFromCloudinary(req.user.id);
        if (!result.success) return res.status(result.statusCode).json(result);
        let user;
        if (type === "upload") {
            const url = result.data;
            user = await userRepo.updateUser({ _id: req.user.id }, { profileImage: url });
        }
        else user = await userRepo.updateUser({ _id: req.user.id }, { profileImage: "default.png" });
        return res.status(user.statusCode).json({
            success: user.success,
            message: user.message,
            imageUrl: result.data ? result.data : "default.png"
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't change your profile image, please try again later !",
            error: "Unexpected Error !"
        });
    };
};