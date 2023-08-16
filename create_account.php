<?php
$conn = mysqli_connect("localhost", "root", "root", "Venti_Cafe_database");

//create account
$new_account_first_name = $_POST['create_account_first_name'];
$new_account_last_name = $_POST['create_account_last_name'];
$new_account_email = $_POST['create_account_email'];
$new_account_password = $_POST['create_account_password'];
$new_account_birthday = date('Y-m-d' ,strtotime($_POST['create_account_birthday']));

$sql = "INSERT INTO `user_accounts`(`first_name`, `last_name`, `email`, `password`, `birthday`) VALUES ('$new_account_first_name','$new_account_last_name','$new_account_email','$new_account_password','$new_account_birthday')";

$res = mysqli_query($conn, $sql);

if ($res){
    header("Refresh:5; url=login_page.html");
    echo 'Your account has been successfully created';
} else{
    header("Refresh:5; url=create_account.html");
    echo 'Error: your account could not be created';
}
$mysqli -> close();
?>