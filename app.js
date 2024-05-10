const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stripe = require('stripe')('your_stripe_secret_key');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up static files directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await mongoose.connect('mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER_URL/YOUR_DATABASE_NAME?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    }
}

connectToDatabase();

// Define routes
app.get('/checkout', (req, res) => {
    res.render('checkout');
});

// Payment route
app.post('/charge', async (req, res) => {
    try {
        const { amount, token } = req.body;
        // Create a charge with Stripe
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'usd',
            source: token,
            description: 'Payment for products'
        });
        // Save the charge to your database or perform any other actions

        // Render success page or redirect to a success URL
        res.render('success');
    } catch (error) {
        console.error("Error processing payment:", error);
        // Render error page or redirect to an error URL
        res.render('error');
    }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
