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