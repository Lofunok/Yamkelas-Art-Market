<?php

include 'configure.php';

session_start();

$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>about</title>

    <!-- font awesome cdn link  -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- custom css file link  -->
    <link rel="stylesheet" href="css/style.css">

</head>

<body class="theme-color">

    <?php include 'header.php'; ?>

    <div class="heading">
        <h3>about us</h3>
        <p> <a href="home.php">Home</a> / About </p>
    </div>

    <section class="about">

        <div class="flex">

            <div class="image">
                <img src="images/About_Us.jpg" alt="">
            </div>

            <div class="content">
                <h3>This is our mission</h3>
                <p>We are a store that is dedicated to paying hommage to unique style and antique of yester-year. We
                    take great care in restoring our products to their original quality.</p>
                <p>When you purchase our products, we want you to feel like you've just purchased a brand new product.
                    Allowing our customers to have a new appreciation for the culture and ideas that layed the
                    foundation for who we are today.</p>
                <a href="contact.php" class="btn">contact us</a>
            </div>

        </div>

    </section>


    <?php include 'footer.php'; ?>

    <!-- custom js file link  -->
    <script src="js/script.js"></script>

</body>

</html>