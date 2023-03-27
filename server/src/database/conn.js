const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connect = async()=>{
    try {
        // createing mongodb in memory 
        // every time we restart server it create new uri, and loose in memory data
        // useful for testing, it is not good to run test on production db
        const mongod = await MongoMemoryServer.create();
        const mongoURI = mongod.getUri();
        mongoose.set('strictQuery',true); //supress warning
        const db = await mongoose.connect(mongoURI);
        console.log("mongodb successfully connected to",mongoURI);
        return db;
    } catch (error) {
        console.log("error");
    }
}

module.exports = connect;