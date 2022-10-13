const express = require('express');
const DBConnect = require('./db/mongoose_init');
const Users = require('./db/model/UsersModel');
const Tasks = require('./db/model/TasksModel');

const app = express();
const port = process.env.PORT || 3000
DBConnect.dbconnection();

app.use(express.json());

app.listen(port, () => {
    console.log(`Server is up to port ${port}`);
});

app.get('/users', async (req, res) => {
    res.send(await Users.fetchAllUsers());
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = (await Users.fetchUsersById(id));
        if (result) {
            res.send(result);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.get('/users', async (req, res) => {
    res.send(await Users.fetchAllUsers());
});

app.post('/users', async (req, res) => {
    const result = await Users.addUser(req.body);
    if (result.errors) {
        res.status(422);
        res.send(result);
    } else {
        res.status(201);
        res.send({ success: true, data: result });
    }
});

app.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Users.updateUser(id, req.body));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send(result);
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Users.deleteUser(id));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send();
    }
});


app.get('/tasks', async (req, res) => {
    res.send(await Tasks.fetchTasks());
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = (await Tasks.fetchTaskById(id));
        if (result) {
            res.send(result);
        } else {
            res.status(404).send();
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Tasks.updateTask(id, req.body));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send(result);
    }

});

app.post('/tasks', async (req, res) => {
    const result = await Tasks.addUser(req.body);
    if (result.errors) {
        res.status(422);
        res.send(result);
    } else {
        res.status(201);
        res.send({ success: true, data: result });
    }
});

// fetchUsersById
