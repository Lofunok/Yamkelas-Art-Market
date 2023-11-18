<?php

include "configure.php";

if (isset($_POST["submit"])) {

    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $surname = mysqli_real_escape_string($conn, $_POST["surname"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $pass = mysqli_real_escape_string($conn, md5($_POST["password"]));
    $cpass = mysqli_real_escape_string($conn, md5($_POST["cpassword"]));
    $user_type = $_POST["user_type"];
    $adminkey = mysqli_real_escape_string($conn, md5($_POST["adminkey"]));
    $cAdminKey = mysqli_real_escape_string($conn, md5("79252626Lmk#"));

    $select_users = mysqli_query($conn, "SELECT * FROM `accounts` WHERE email ='$email' AND password = '$pass'") or die("query failed");

    //Check if user does not already exist
    if (mysqli_num_rows($select_users) > 0) {
        $message[] = "users already exists!";
    } else {
        //Check if password and confirm password are the same value
        if ($pass != $cpass) {
            $message[] = "Confirm password does not match with password!";
        } else {
            //Check if user is authorized
            if (($user_type == "admin") && ($adminkey != $cAdminKey)) {
                $message[] = "Admin key incorrect!";
            } else {
                mysqli_query($conn, "INSERT INTO `accounts` (name, surname, email, password, type) VALUES('$name', '$surname', '$email' , '$cpass', '$user_type')") or die("query failed");
                $message[] = "registration successful!";
                header('location:login.php');
            }
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>register</title>

    <!-- font awesome cdn link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--custom css file link-->
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <?php
    if (isset($message)) {
        foreach ($message as $message) {
            echo '<div class="message">
        <span style= >' . $message . '</span>
        <i class= "fas fa-times" onclick="this.parentElement.remove();"></i>
        </div>
        ';
        }
    }
    ?>
    <div class="form-container">
        <form action="" method="post">
            <h3>Register New Account</h3>

            <input type="text" name="name" placeholder="Enter your name" required class="box">
            <input type="text" name="surname" placeholder="Enter your surname" class="box">
            <input type="email" name="email" placeholder="Enter your email" required class="box">
            <input type="password" name="password" placeholder="Enter your password" required class="box">
            <input type="password" name="cpassword" placeholder="Confirm your password" required class="box">
            <select name="user_type" class="box">
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
            <input type="password" name="adminkey" placeholder="Enter admin-key if user-type is admin" class="box">
            <input type="submit" name="submit" value="sign in" class="btn">
            <p>Already have a VS account? <a href="login.php">Sign-in</a></p>
        </form>
    </div>


</body>

</html>