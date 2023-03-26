const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async()=>{
    try {
        const mongod = await MongoMemoryServer.create();
        const getURI = mongod.getUri();
        mongoose.set('strictQuery',true);
        const db = await mongoose.connect(getURI);
        console.log("database connected");
        return db;
    } catch (error) {
        console.log("error");
    }
}

module.exports = connect;