const joi = require("joi");
const objectId = require('joi-objectid')(joi);

module.exports = {

    getAllTasksValid: {
        query: joi.object().required().keys({
            userId: objectId().required().messages({
                "string.empty": "User id can't be empty",
                "any.required": "User id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),
            year: joi.number().integer().min(2024).required().messages({
                "number.base": "Year must be a number",
                "number.integer": "Year must be an integer",
                "number.min": "Year must be more than or equal 2024",
                "any.required": "Year is required",
            }),
            month: joi.number().integer().min(1).max(12).required().messages({
                "number.base": "Month must be a number",
                "number.integer": "Month must be an integer",
                "number.min": "Month must be between 1 and 12",
                "number.max": "Month must be between 1 and 12",
                "any.required": "Month is required",
            }),
            page: joi.number().min(1).default(1).messages({
                "number.base": "Page must be a number",
                "number.min": "Page must be a positive number",
            }),
            limit: joi.number().min(1).default(10).messages({
                "number.base": "Page must be a number",
                "number.min": "Page must be a positive number",
            }),

        }),
    },

    getSpecificTasksTypeValid: {
        query: joi.object().required().keys({

            page: joi.number().min(1).default(1).messages({
                "number.base": "Page must be a number",
                "number.min": "Page must be a positive number",
            }),

            limit: joi.number().min(1).default(10).messages({
                "number.base": "Page must be a number",
                "number.min": "Page must be a positive number",
            }),

            type: joi.string().valid('toDo', 'inProgress', 'done').messages({
                "string.any": " Task status must be one of [toDo, InProgress, done]",
            }),

            userId: objectId().required().messages({
                "string.empty": "User id can't be empty",
                "any.required": "User id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),

        }),
    },

    addTaskValid: {
        body: joi.object().required().keys({

            title: joi.string().required().messages({
                "string.empty": "Title can't be empty",
                "any.required": "Title is required"
            }),

            content: joi.string().required().messages({
                "string.empty": "Content can't be empty",
                "any.required": "Content is required"
            }),

            startDate: joi.date().required().messages({
                "string.empty": "Start date can't be empty",
                "any.required": "Start date is required"
            }),

            endDate: joi.date().required().messages({
                "string.empty": "End date can't be empty",
                "any.required": "End date is required"
            }),

        }),
    },

    editTaskValid: {

        body: joi.object().required().keys({
            title: joi.string(),
            content: joi.string(),
            startDate: joi.date(),
            endDate: joi.date(),
            taskStatus: joi.string().valid('toDo', 'inProgress', 'done').messages({
                "any.only": " Task status must be one of [toDo, InProgress, done]",
            }),
        }),

        query: joi.object().required().keys({
            taskId: objectId().required().messages({
                "string.empty": "Task id can't be empty",
                "any.required": "Task id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),
            userId: objectId().required().messages({
                "string.empty": "User id can't be empty",
                "any.required": "User id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),
        }),

    },

    deleteTaskValid: {
        query: joi.object().required().keys({

            taskId: objectId().required().messages({
                "string.empty": "Task id can't be empty",
                "any.required": "Task id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),

            userId: objectId().required().messages({
                "string.empty": "User id can't be empty",
                "any.required": "User id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),

        }),
    },

    deleteAllTasksTypeValid: {
        query: joi.object().required().keys({

            type: joi.string().valid('toDo', 'inProgress', 'done').messages({
                "string.any": " Task status must be one of [toDo, InProgress, done]",
            }),

            userId: objectId().required().messages({
                "string.empty": "User id can't be empty",
                "any.required": "User id is required",
                'objectId.invalid': 'Task id must be a valid id'
            }),

        }),
    },

};