<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "Nik25hil!!!";
$database = "mazemirage_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

header('Content-Type: application/json'); // Specify the type of response expected

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect input data
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $feature_requests = $conn->real_escape_string($_POST['feature_requests']);
    $general_comments = $conn->real_escape_string($_POST['general_comments']);
    $bug_reports = $conn->real_escape_string($_POST['bug_reports']);
    $website_usability = $conn->real_escape_string($_POST['website_usability']);
    $gameplay_experience = $conn->real_escape_string($_POST['gameplay_experience']);

    // Prepare an SQL statement to avoid SQL injection
    $stmt = $conn->prepare("INSERT INTO user_feedback (name, email, feature_requests, general_comments, bug_reports, website_usability, gameplay_experience, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssssss", $name, $email, $feature_requests, $general_comments, $bug_reports, $website_usability, $gameplay_experience);

    // Execute the statement and check for success
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Thank you for your feedback!']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'An error occurred. Please try again later.']);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
} else {
    // Not a POST request
    echo json_encode(['status' => 'error', 'message' => 'Invalid request type.']);
}
?>
