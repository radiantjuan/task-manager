const express = require('express');
const DBConnect = require('./db/mongoose_init');

const UserRoutes = require('./routers/user');
const TaskRoutes = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000

DBConnect.dbconnection();

app.use(express.json());
app.use(UserRoutes);
app.use(TaskRoutes);

app.listen(port, () => {
    console.log(`Server is up to port ${port}`);
});


// const jwt = require('jsonwebtoken');

// const myfunc = async() => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'thisismynewcourse');
//     console.log(data);
// }

// myfunc();