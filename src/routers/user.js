const express = require('express');
const User = require('../db/model/UsersModel');
const router = new express.Router();
const auth = require('../middleware/auth');

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
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
        const token = await user.generateAuthToken();
        if (token.errors || token.errmsg) {
            res.status(422);
            res.send(token);
        } else {
            res.status(201);
            res.send({ token });
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
            res.status(404).send({ error: "not found" });
        }
        updates.forEach((update) => user[update] = body[update]);
        const result = (await user.save());
        if (!result) {
            res.status(404).send({ error: "not found" });
        }
        res.send(result);
    } catch (err) {
        res.status(500).send({ error: "something happened" });
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const del = (await User.findByIdAndDelete(id));
        if (!del) {
            res.status(400).send({ error: 'failed delete ID not existing' });
        }
        res.send(del);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: e });
    }
});

router.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((data) => {
            return data.token !== req.token.trim();
        });
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/users/logoutall', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;