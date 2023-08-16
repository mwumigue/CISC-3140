<?php
$conn = mysqli_connect("localhost", "root", "root", "Venti_Cafe_database");

$recover_email = $_POST['recover_account_email'];
$recover_birthday = date('Y-m-d' ,strtotime($_POST['recover_account_birthday']));

$password_retrieved = "SELECT password FROM user_accounts WHERE email='$recover_email' AND birthday='$recover_birthday'";

$result = $conn->query($password_retrieved);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $account_password = $row["password"];
        header("Refresh:5; url=login_page.html");
        echo 'Your password is: '.$account_password;
    }
} else {
    header("Refresh:5; url=recover_password.html");
    echo 'Account not found. Try Again';
}
?>