const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views'); // Set the views directory

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Setting up static files directory without redeclaring __dirname
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://ECOM:<password>@ecom.nvx0qhs.mongodb.net/?retryWrites=true&w=majority&appName=ECOM', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToDatabase();



app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
