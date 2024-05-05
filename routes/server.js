const express = require('express');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./routes/feedbackRoutes');
const setupCORS = require('./cors'); // Adjust the path as necessary


const app = express();

setupCORS(app);

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
