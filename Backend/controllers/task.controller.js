const taskRepo = require('../models/task/task.repo');

// function that allows user to get all tasks 
exports.getAllTasks = async (req, res) => {
    try {
        const { userId, year, month } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let data = await taskRepo.getTasks(
            {
                addedBy: userId,
                createdAt: {
                    $gte: new Date(year, month - 1, 1),
                    $lt: new Date(year, month, 1)
                }
            },
            { page, limit }
        );
        return res.status(data.statusCode).json(data);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your tasks !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to get all tasks of specific type
exports.getSpecificTasksType = async (req, res) => {
    try {
        const { userId, type } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let data = await taskRepo.getTasks({ addedBy: userId, taskStatus: type }, { page, limit });
        return res.status(data.statusCode).json(data);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your tasks !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows user to create a new task 
exports.addTask = async (req, res) => {
    try {
        const taskData = req.body;
        taskData['addedBy'] = req.user.id;
        taskData['createdAt'] = Date.now();
        let addTaskPromise = await taskRepo.createTask(taskData);
        return res.status(addTaskPromise.statusCode).json(addTaskPromise);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't add this task !",
            error: "Unexpected Error !"
        });
    };
};

// function that allows user to edit a specific task 
exports.editTask = async (req, res) => {
    try {
        const taskData = req.body;
        const { userId, taskId } = req.query;
        let editTaskPromise = await taskRepo.updateTask({ addedBy: userId, _id: taskId }, taskData, { new: true });
        return res.status(editTaskPromise.statusCode).json(editTaskPromise);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't edit this task !",
            error: "Unexpected Error !"
        });
    };
};

// function that allows user to delete a specific task 
exports.deleteTask = async (req, res) => {
    try {
        const { userId, taskId } = req.query;
        let deleteTaskPromise = await taskRepo.deleteTask({ addedBy: userId, _id: taskId });
        return res.status(deleteTaskPromise.statusCode).json(deleteTaskPromise);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't delete this task !",
            error: "Unexpected Error !"
        });
    };
};

// function that allows user to delete all tasks of specific type 
exports.deleteAllTasksType = async (req, res) => {
    try {
        const { userId, type } = req.query;
        let deleteTaskPromise = await taskRepo.deleteAllTasks({ addedBy: userId, taskStatus: type });
        return res.status(deleteTaskPromise.statusCode).json(deleteTaskPromise);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't delete all tasks !",
            error: "Unexpected Error !"
        });
    };
};