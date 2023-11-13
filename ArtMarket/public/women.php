<?php

include 'configure.php';

session_start();

$user_id = $_SESSION['user_id'];

if (!isset($user_id)) {
    header('location:login.php');
}

if (isset($_POST['add_to_cart'])) {

    $product_name = $_POST['product_name'];
    $product_gender = $_POST['product_gender'];
    $product_size = $_POST['product_size'];
    $product_price = $_POST['product_price'];
    $product_image = $_POST['product_image'];
    $product_quantity = $_POST['product_quantity'];
    $product_id = $_POST['product_id'];


    $check_cart_numbers = mysqli_query($conn, "SELECT * FROM `cart` WHERE name ='$product_name' AND user_id =$user_id") or die('query failed');

    if (mysqli_num_rows($check_cart_numbers) > 0) {
        $message[] = 'Already added to cart!';
    } else {
        mysqli_query($conn, "INSERT INTO `cart`(user_id, name, product_id, price, gender, size, quantity, image) VALUES('$user_id', '$product_name', '$product_id',  '$product_price', '$product_gender', '$product_size', '$product_quantity', '$product_image')") or die('query failed');
        $message[] = 'product added to cart!';
    }
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>shop</title>

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
        <h3>shop vintage clothes</h3>
        <p> <a href="home.php">Home</a> / Clothes </p>
    </div>

    <section class="products">

        <h1 class="title">latest apparals</h1>

        <div class="box-container">

            <?php
            $select_products = mysqli_query($conn, "SELECT * FROM `clothes` WHERE gender = 'F'") or die('query failed');
            if (mysqli_num_rows($select_products) > 0) {
                while ($fetch_products = mysqli_fetch_assoc($select_products)) {
            ?>
            <form action="" method="post" class="box">
                <img class="image" src="uploaded_img/<?php echo $fetch_products['image']; ?>" alt="">
                <div class="name"><?php echo $fetch_products['name']; ?></div>
                <select name="product_size" class="qty">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
                <div class="price">R<?php echo $fetch_products['price']; ?></div>

                <input type="number" min="1" name="product_quantity" value="1" class="qty">
                <input type="hidden" name="product_name" value="<?php echo $fetch_products['name']; ?>">
                <input type="hidden" name="product_id" value="<?php echo $fetch_products['id']; ?>">
                <input type="hidden" name="product_gender" value="<?php echo $fetch_products['gender']; ?>">
                <input type="hidden" name="product_price" value="<?php echo $fetch_products['price']; ?>">
                <input type="hidden" name="product_image" value="<?php echo $fetch_products['image']; ?>">
                <input type="submit" value="add to cart" name="add_to_cart" class="btn">
            </form>
            <?php
                }
            } else {
                echo '<p class="empty">no products added yet!</p>';
            }
            ?>
        </div>


    </section>








    <?php include 'footer.php'; ?>

    <!-- custom js file link  -->
    <script src="js/script.js"></script>

</body>

</html>