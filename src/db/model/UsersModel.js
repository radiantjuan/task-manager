const { model } = require('mongoose');
const validator = require('validator');

const User = model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value === 'password') {
                throw new Error('Password must be unique');
            }
        }
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value <= 0) {
                throw new Error('Age must be postive');
            }
        }
    }
});

const fetchAllUsers = async () => {
    try {
        const result = (await User.find({}));
        return result;
    } catch(err) {
        return err;
    }
}

const fetchUsersById = async (id) => {
    try {
        const result = (await User.findById(id).exec());
        return result;
    } catch(err) {
        throw Error('Error in fetching data in the database');
    }
}

const addUser = async (data) => {
    try {
        const user = new User(data);
        return await user.save();
    } catch (err) {
        return err;
    }
}

const updateUser  = async (id, data) => {
    const updates = Object.keys(data);
    const fillable = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => fillable.includes(update));

    if (!isValidOperation) {
        return {error: 'Invalid schema update'}
    }

    try {
        const user = (await User.findOneAndUpdate({_id: id}, data, {new: true, runValidators: true, useFindAndModify: false}));
        if (!user) {
            return {error: 'can\'t find ID'}
        }
        return user;
    } catch (err) {
        return err
    }
}

const deleteUser = async (id) => {
    try {
        const del = (await User.findByIdAndDelete(id));
        if (!del) {
            return {error: 'failed delete ID not existing'};
        }
        return del;
    } catch(err) {
        return err
    }
};

module.exports = {
    fetchAllUsers: fetchAllUsers,
    fetchUsersById: fetchUsersById,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
} 

// const me = new User({
//     email: "radjuan@gmail.com",
//     name: "   Radiant Juan",
//     password: "ajlkjasdkjakdj",
//     age: 25
// });

// me.save().then((res) => {
//     console.log(res);
// }).catch((error) => {
//     console.log(error.errors.password.properties.message);
// }).finally(() => {
    
// });