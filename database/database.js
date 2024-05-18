const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;

function connectDB() {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.log('Connection failed:', err);
    });
}

module.exports = connectDB;
