const app = require('express').Router();

// note module controller functions 
const {
    getAllTasks,
    getSpecificTasksType,
    addTask,
    editTask,
    deleteTask,
    deleteAllTasksType,
} = require('../controllers/task.controller');

// validation schema 
const {
    getAllTasksValid,
    addTaskValid,
    editTaskValid,
    deleteTaskValid,
    deleteAllTasksTypeValid,
    getSpecificTasksTypeValid
} = require('../validation/task.validation');

// function that validates validation schema
const { validator } = require('../validation/validator');

// authentication middleware
const { decodeToken } = require('../Auth/decodeToken');

// note module routes 
app.get('/getAllTasks', decodeToken(), validator(getAllTasksValid, 'query'), getAllTasks);
app.get('/getSpecificTasksType', decodeToken(), validator(getSpecificTasksTypeValid, 'query'), getSpecificTasksType);
app.post('/addTask', decodeToken(), validator(addTaskValid), addTask);
app.patch('/editTask', decodeToken(), validator(editTaskValid, 'bodyAndQuery'), editTask);
app.delete('/deleteTask', decodeToken(), validator(deleteTaskValid, 'query'), deleteTask);
app.delete('/deleteAllTasksType', decodeToken(), validator(deleteAllTasksTypeValid, 'query'), deleteAllTasksType);

module.exports = app;