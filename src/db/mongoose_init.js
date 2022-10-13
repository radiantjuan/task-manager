const { connect, disconnect } = require('mongoose');
const dbconnect = async () => {
    return await connect('mongodb://127.0.0.1:27017/task-manager-api', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
};
const dbdisconnect = async () => {
    await disconnect();
}

module.exports = {
    dbconnection: dbconnect,
    dbdisconnect: dbdisconnect
}