const express = require('express');
const DBConnect = require('./db/mongoose_init');

const UserRoutes = require('./routers/user');
const TaskRoutes = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000

DBConnect.dbconnection();

// app.use((req, res, next) => {
//     res.status(503).send('Site is currently on maintenance');
// });

app.use(express.json());
app.use(UserRoutes);
app.use(TaskRoutes);

app.listen(port, () => {
    console.log(`Server is up to port ${port}`);
});


// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     return {};
// }

// console.log(JSON.stringify(pet));


// const Task = require('./db/model/TasksModel');
// const User = require('./db/model/UsersModel');
// const main = async () => {
//     const task = await Task.findById('635695864925f54e9c3600de');
//     await task.populate('owner').execPopulate();
//     console.log(task.owner);
// }

// const main = async () => {
//     const user = await User.findById('63568f68c463296954775dd2');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main();