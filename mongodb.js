// CRUD
const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const database_name = 'task-manager';

const run = () => {
    MongoClient.connect(connectionURL, { useUnifiedTopology: true }, async (error, client) => {
        if (error) {
            console.log('UNable to connect');
        }

        const db = client.db(database_name);

        // try {
        //     const result = (await db.collection('users').insertOne({
        //         name: 'Rad',
        //         age: 27
        //     }));
        //     console.log(result.ops);
        // } catch (err) {

        // } finally {
        //     await client.close();
        // }

        // try {
        //     const result = (await db.collection('tasks').insertMany([
        //         {
        //             description: 'Clean the house',
        //             comleted: true,
        //         },
        //         {
        //             description: 'Do the laundry',
        //             comleted: false,
        //         },
        //         {
        //             description: 'Buy some grocery',
        //             comleted: false,
        //         },
        //     ]));
        //     console.log(result.ops);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     await client.close();
        // }

        // try {
        //     const result = (await db.collection('users').findOne({_id: new ObjectID("634176e8e9f7b331b036ed9e")}));
        //     const final_result = (await result);
        //     console.log(final_result._id);
        // } catch (err) {
        //     console.log(err);
        // } finally {
        //     await client.close();
        // }

        // try {
        //     const result = (await db.collection('users').updateOne({_id: new ObjectID("634176356e81b970e076e0da")}, {
        //         $set: {
        //             name: "Bogus"
        //         },
        //         $inc: {
        //             age: 5
        //         }
        //     }));

        //     const update = (await db.collection('tasks').updateMany({completed: false}, {
        //         $rename: {
        //             comleted: 'completed'
        //         }
        //     }));
        //     await client.close();
        //     console.log(update);
        // } catch (err){
        //     console.log(err);
        // }


        // try {
        //     const del = (await db.collection('users').deleteMany({age:27}));
        //     console.log(del);
        //     await client.close();
        // } catch (err) {

        // }

    });
}

run();