<?php

include "configure.php";
session_start();

if (isset($_POST["submit"])) {

    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $pass = mysqli_real_escape_string($conn, md5($_POST["password"]));

    $select_users = mysqli_query($conn, "SELECT * FROM `accounts` WHERE email ='$email' AND password = '$pass'") or die("query failed");

    if (mysqli_num_rows($select_users) > 0) {
        $row = mysqli_fetch_assoc($select_users);
        if ($row['type'] == 'admin') {
            $_SESSION['admin_name'] = $row['name'];
            $_SESSION['admin_surname'] = $row['surname'];
            $_SESSION['admin_email'] = $row['email'];
            $_SESSION['admin_id'] = $row['id'];
            header('location:admin_page.php');
        } else {
            if ($row['type'] == 'user') {

                $_SESSION['user_name'] = $row['name'];
                $_SESSION['user_surname'] = $row['surname'];
                $_SESSION['user_email'] = $row['email'];
                $_SESSION['user_id'] = $row['id'];
                header('location:home.php');
            }
        }
    } else {
        $message[] = 'incorrect email or password';
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>login</title>

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
            <h3>welcome to <span>vintage society<i class="fas fa-registered"></i></span></h3>
            <img src="images/vintage_logo.png" alt="">
            <input type="email" name="email" placeholder="Enter your email" required class="box">
            <input type="password" name="password" placeholder="Enter your password" required class="box">
            <input type="submit" name="submit" value="login" class="btn">
            <p>Don't have a VS account yet? <a href="register.php">Sign-Up</a></p>
        </form>
    </div>


</body>

</html>