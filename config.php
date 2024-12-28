<?php
$hostname = "127.0.0.1"; // Corrected IP address
$username = "root";
$password = ""; // blank because no password is set
$database = "shop_db";
$port = "3306"; 

$conn = mysqli_connect($hostname, $username, $password, $database, $port);

if (!$conn) {
    die("Connection failed: (" . mysqli_connect_errno() . ") " . mysqli_connect_error());
}
?>
