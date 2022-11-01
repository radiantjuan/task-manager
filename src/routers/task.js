const express = require('express');
const Tasks = require('../db/model/TasksModel');
const router = new express.Router();
const auth = require('../middleware/auth');


// router.get('/tasks/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const result = (await Tasks.fetchTaskById(id));
//         if (result) {
//             res.send(result);
//         } else {
//             res.status(404).send();
//         }

//     } catch (err) {
//         res.status(500).send({ error: err.message });
//     }
// });

router.get('/tasks', auth, async (req, res) => {
    const query = {
        owner: req.user._id
    }

    const sort = {}

    if (req.query.completed) {
        query.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = (parts[1] === 'desc') ? -1 : 1;
    }

    try {
        const result = await Tasks.find(query, {}, {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
            sort
        });
        if (!result) {
            res.status(404).send();
        }
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
});

router.post('/tasks', auth, async (req, res) => {
    try {
        const tasks = new Tasks({
            ...req.body,
            owner: req.user._id
        });
        const data = await tasks.save();
        res.status(201);
        res.send({ success: true, data });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = (await Tasks.findOne({ owner: req.user._id, _id: id }).exec());
        if (!result) {
            return res.status(404).send();
        }
        await result.populate('owner').execPopulate();
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(400).send('something went wrong');
    }

});

router.patch('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params
    const data = req.body;

    const dataToUpdate = Object.keys(data);
    const fillable = ['description', 'completed'];
    const isValidOperation = dataToUpdate.every((datatoupdate) => {
        return fillable.includes(datatoupdate);
    });

    if (!isValidOperation) {
        return res.status(422).send('Invalid schema to update');
    }

    try {

        const update = (await Tasks.findOneAndUpdate({ _id: id, owner: req.user._id }, data, { new: true, runValidators: true, useFindAndModify: false }));
        if (!update) {
            res.status(404).send();
        }

        res.send(update);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Tasks.findOneAndDelete({ _id: id, owner: req.user._id });
        if (!result) {
            res.status(404).send();
        }
        res.send(result);
    } catch (err) {
        res.status(500).send('something went wrong');
    }
});

module.exports = router;