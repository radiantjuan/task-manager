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

const updateTask = async (id, data) => {
    const dataToUpdate = Object.keys(data);
    const fillable = ['description', 'completed'];
    const isValidOperation = dataToUpdate.every((datatoupdate) => {
        return fillable.includes(datatoupdate);
    });

    try {
        if (!isValidOperation) {
            return {error: 'Invalid schema to update'};
        }
        const update = (await Tasks.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true, useFindAndModify: false}));
        if (!update) {
            return {error: 'something went wrong when updating'};
        }
        
        return update;
    } catch (err) {
        return err;
    }
}

const deleteTask = async (id) => {
    try {
        // const result  = (await Tasks.findByIdAndDelete(id));
        // console.log(result);
        return (await Tasks.countDocuments({completed: true}));
    } catch (err) {
        return err
    }
}

module.exports = {
    fetchTaskById: fetchTaskById,
    fetchTasks: fetchTasks,
    addTask: addTask,
    deleteTask: deleteTask,
    updateTask: updateTask
}