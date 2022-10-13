const { model } = require('mongoose');
const validator = require('validator');

const Tasks = model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const fetchTasks = async (id) => {
    try {
        return (await Tasks.find({}));
    } catch (err) {
        throw Error('something went wrong!');
    }
}

const fetchTaskById = async (id) => {
    try {
        return (await Tasks.findById(id).exec());
    } catch (err) {
        throw Error('something went wrong!');
    }
}

const addTask = async (data) => {
    try {
        const tasks = new Tasks(data);
        await tasks.save();
    } catch (err) {
        return err
    }
}

module.exports = {
    fetchTaskById: fetchTaskById,
    fetchTasks: fetchTasks,
    addTask: addTask
}