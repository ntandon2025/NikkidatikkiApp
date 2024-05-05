const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Setup a MySQL connection
const pool = mysql.createPool({
    host: 'localhost',
  user: 'root',
  password: 'Nik25hil!!',
  database: 'mazemirage_db'
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
