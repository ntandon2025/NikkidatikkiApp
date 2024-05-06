require('dotenv').config(); // Load environment variables from .env file at the start

const express = require('express');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedbackRoutes'); // Ensure this path matches your file structure
const cors = require('cors'); // Typically, you would use the cors package

const app = express();

// Setup CORS (Cross-Origin Resource Sharing) options if needed
app.use(cors({
    origin: '*', // Adjust according to your needs, '*' for open access
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    credentials: true // Enable credentials if your front end needs to pass auth tokens
}));

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
