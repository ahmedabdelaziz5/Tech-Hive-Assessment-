const cloudinary = require('../config/cloud.config');

// function that uploads/overwrites image to cloudinary
exports.uploadImageToCloudinary = async (file, publicId, path) => {
    try {
        const result = await cloudinary.v2.uploader.upload(file, {
            folder: path,
            public_id: publicId,
            overwrite: true,
        },
            function (error, result) {
                if (error) {
                    return {
                        success: false,
                        statusCode: 500,
                        message: "something went wrong, could not upload media !"
                    }
                };
            });
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: result.url
        }
    }
    catch (err) {
        console.log(err);
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

// function that removes image from cloudinary
exports.removeImageFromCloudinary = async (publicId) => {
    try {
        const assetId = "users images/" + publicId;
        const result = await cloudinary.v2.uploader.destroy(assetId);
        if (result.result !== "ok") {
            return {
                success: false,
                statusCode: 500,
                message: "something went wrong, could not remove media !"
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: 'success'
        };
    }
    catch (error) {
        return {
            success: false,
            statusCode: 500,
            message: error.message
        };
    }
};