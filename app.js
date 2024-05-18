const express = require('express');
const app = express();
const routesRegister = require('./routes/auth.js');
const routesUser = require('./routes/users.js');
const routesProduct = require('./routes/product.js');
const routesCart = require('./routes/cart.js');
const routesOrder = require('./routes/order.js');
const port = process.env.PORT || 3040; // Added fallback to port 3040 if PORT is not defined in .env

const connectDB = require('./database/database.js');
const cors = require('cors');

app.use(cors()); // Using the cors middleware for handling CORS headers

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/auth', routesRegister);
app.use('/user', routesUser);
app.use('/product', routesProduct);
app.use('/cart', routesCart);
app.use('/order', routesOrder);

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

start();
