const express = require('express');
const Tasks = require('../db/model/TasksModel');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
    res.send(await Tasks.fetchTasks());
});

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Tasks.updateTask(id, req.body));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send(result);
    }

});

router.post('/tasks', async (req, res) => {
    const result = await Tasks.addUser(req.body);
    if (result.errors) {
        res.status(422);
        res.send(result);
    } else {
        res.status(201);
        res.send({ success: true, data: result });
    }
});

module.exports = router;