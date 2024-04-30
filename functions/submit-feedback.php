<?php
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
?>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $feature_requests = $conn->real_escape_string($_POST['feature_requests']);
    $general_comments = $conn->real_escape_string($_POST['general_comments']);
    $bug_reports = $conn->real_escape_string($_POST['bug_reports']);
    $website_usability = $conn->real_escape_string($_POST['website_usability']);
    $gameplay_experience = $conn->real_escape_string($_POST['gameplay_experience']);

    // SQL to insert data
    $sql = "INSERT INTO user_feedback (name, email, feature_requests, general_comments, bug_reports, website_usability, gameplay_experience, created_at)
    VALUES ('$name', '$email', '$feature_requests', '$general_comments', '$bug_reports', '$website_usability', '$gameplay_experience', NOW())";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>

