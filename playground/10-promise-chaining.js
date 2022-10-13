const dbconnection = require('../src/db/mongoose_init');
const Task = require('../src/db/model/TasksModel');

dbconnection.dbconnection();
Task.deleteTask('63428d6eb7c68b52b0896cc5').then((result) => {
    console.log(result);
});
