
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',  // Fallback to 'localhost' if DB_HOST is not set
    user: process.env.DB_USER || 'root',      // Fallback to 'root' if DB_USER is not set
    password: process.env.DB_PASSWORD,        // No fallback; it should be provided via environment variables
    database: process.env.DB_NAME || 'mazemirage_db'  // Fallback to 'mazemirage_db' if DB_NAME is not set
});


// POST endpoint for feedback submission
router.post('/submit-feedback', (req, res) => {
    const { name, email, feature_requests, general_comments, bug_reports, website_usability, gameplay_experience } = req.body;
    const sql = "INSERT INTO feedback (name, email, feature_requests, general_comments, bug_reports, website_usability, gameplay_experience) VALUES (?, ?, ?, ?, ?, ?, ?)";

    pool.query(sql, [name, email, feature_requests, general_comments, bug_reports, website_usability, gameplay_experience], (error, results) => {
        if (error) {
            res.status(500).json({ status: 'error', message: 'Error submitting feedback', error: error.message });
        } else {
            res.json({ status: 'success', message: 'Feedback submitted successfully' });
        }
    });
});

module.exports = router;
