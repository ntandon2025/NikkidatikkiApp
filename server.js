const express = require('express');
const bodyParser = require('body-parser');
const feedbackRoutes = require('./feedbackRoutes'); // Make sure the path matches your folder structure

const app = express();

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/', feedbackRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
