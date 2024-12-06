<?php
session_start();

// Hardcoded username and password
$valid_username = "admin";
$valid_password = "password123";

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the entered credentials match the hardcoded ones
    if ($username === $valid_username && $password === $valid_password) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: catalogue.html"); // Redirect to catalogue page after successful login
        exit;
    } else {
        echo "Invalid username or password!";
    }
}
?>
