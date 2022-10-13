const express = require('express');
const Users = require('../db/model/UsersModel');
const router = new express.Router();

router.get('/users', async (req, res) => {
    res.send(await Users.fetchAllUsers());
});

router.get('/users/:id', async (req, res) => {
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

router.get('/users', async (req, res) => {
    res.send(await Users.fetchAllUsers());
});

router.post('/users', async (req, res) => {
    const result = await Users.addUser(req.body);
    if (result.errors) {
        res.status(422);
        res.send(result);
    } else {
        res.status(201);
        res.send({ success: true, data: result });
    }
});

router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Users.updateUser(id, req.body));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send(result);
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const result = (await Users.deleteUser(id));
    if (!result || result.error) {
        res.status(400).send(result);
    } else {
        res.send();
    }
});

module.exports = router;