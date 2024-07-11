const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true, default: "title" },
    content: { type: String, required: true, default: "description" },
    addedBy: { type: ObjectId, required: true, ref: 'user' },
    taskStatus: { type: String, required: true, default: "toDo" }, // To do , In progress, Done
    createdAt: { type: Date, default: Date.now() },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    doneAt: { type: Date },
});

taskSchema.index({ addedBy: 1 });

const Task = mongoose.model('task', taskSchema);

module.exports = Task;