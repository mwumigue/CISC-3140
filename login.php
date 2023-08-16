<?php
$conn = mysqli_connect("localhost", "root", "root", "Venti_Cafe_database");

$login_email = $_POST['login_email'];
$login_password = $_POST['login_password'];

$password_retrieved = "SELECT password FROM user_accounts WHERE email='$login_email'";

$result = $conn->query($password_retrieved);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $account_password = $row["password"];
        if ($account_password == $login_password){
            header("Refresh:5; url=main.html");
            echo 'login success';
        } else {
            header("Refresh:5; url=login_page.html");
            echo 'login failed';
        }
    }
} else {
    echo "user not found";
}

$mysqli -> close();
?>