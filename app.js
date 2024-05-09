require('dotenv').config()
const express = require('express')
const app = express()
const routesRegister = require('./routes/auth.js')
const routesUser = require('./routes/users.js')
// const routesProduct = require('./routes/product.js')
const port = 3040;
const connectDB = require('./database/database.js')
const cors = require('cors')

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/auth',routesRegister);
app.use('/user',routesUser);
// app.use('/product',routesProduct)
// app.use('/user/',routesUser)
const start = async() => {
    try {
        await connectDB()
        app.listen(port , console.log('server is connceted'))
    } catch (error) {
        console.log('server is not connected')
    }
}

start()