const express = require('express');
const User = require('../db/model/UsersModel');
const router = new express.Router();

router.get('/users', async (req, res) => {
    try {
        res.send(await User.find({}));
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = (await User.findById(id).exec());
        if (result) {
            res.send(result);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/users', async (req, res) => {
    const { body } = req;
    try {
        const user = new User(body);
        const result = await user.generateAuthToken();
        if (result.errors || result.errmsg) {
            res.status(422);
            res.send(result);
        } else {
            res.status(201);
            res.send({ success: true, data: result });
        }
    } catch (err) {
        console.error(err)
        res.status(500).send(err);
    }
});

router.patch('/users/:id', async (req, res) => {
    const { body, params } = req;
    const updates = Object.keys(body);
    const fillable = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => fillable.includes(update));

    if (!isValidOperation) {
        return { error: 'Invalid schema update' }
    }

    try {
        const user = await User.findById(params.id);
        if (!user) {
            res.status(404).send({error: "not found"});
        }
        updates.forEach((update) => user[update] = body[update]);
        const result = (await user.save());
        if (!result) {
            res.status(404).send({error: "not found"});
        }
        res.send(result);
    } catch (err) {
        res.status(500).send({error: "something happened"});
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const del = (await User.findByIdAndDelete(id));
        if (!del) {
            res.status(400).send({error: 'failed delete ID not existing'});
        }
        res.send(del);
    } catch(err) {
        res.status(500).send(err);
    }
});

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        console.log(e);
        res.status(500).send({error: e});
    }
});

module.exports = router;