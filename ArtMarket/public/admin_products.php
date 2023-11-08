<?php

include 'configure.php';

session_start();
$admin_id = $_SESSION['admin_id'];

//If user does not login, return to login page
if (!isset($admin_id)) {
    header('location:login.php');
}

if (isset($_POST["add_product"])) {

    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $gender = $_POST["gender"];
    $price = $_POST["price"];
    $image = $_FILES["image"]["name"];
    $image_size = $_FILES["image"]["size"];
    $image_tmp_name = $_FILES["image"]["tmp_name"];
    $image_folder = "uploaded_img/" . $image;

    $select_product_name = mysqli_query($conn, "SELECT name FROM `clothes` WHERE name = '$name'") or die("query failed");

    if (mysqli_num_rows($select_product_name) > 0) {
        $message[] = "Product already added";
    } else {
        $add_product_query = mysqli_query($conn, "INSERT INTO `clothes`(name, gender, price, image) VALUES ('$name','$gender', '$price', '$image')") or die("query failed");

        if ($add_product_query) {
            if ($image_size > 2000000) {
                $message[] = "Image size is too large!";
            } else {
                move_uploaded_file($image_tmp_name, $image_folder);
                $message[] = "Product added successfully!";
            }
        } else {
            $message[] = "Product could not be added!";
        }
    }
}

if (isset($_GET['delete'])) {
    $delete_id = $_GET['delete'];
    $delete_image_query = mysqli_query($conn, "SELECT image FROM `clothes` WHERE id = $delete_id") or die("query failed");
    $fetch_delete_image = mysqli_fetch_assoc($delete_image_query);
    unlink('uploaded_img/' . $fetch_delete_image["image"]);
    mysqli_query($conn, "DELETE FROM `clothes` WHERE id ='$delete_id'") or die("query failed");
    header("location: admin_products.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Products</title>

    <!-- font awesome cdn link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--Custom admin page css file-->
    <link rel="stylesheet" href="css/admin_style.css">
</head>

<body class="theme-color">
    <?php include 'admin_header.php'; ?>

    <!--product CRUD section starts-->
    <section class="add-products">

        <h1 class="title">Clothing Items</h1>

        <form action="" method="post" enctype="multipart/form-data">
            <h3>Add Items To The Shop</h3>
            <input type="text" name="name" class="box" placeholder="Enter product name" required>
            <select name="gender" class="box" placeholder="Select product category">
                <option value="M">M</option>
                <option value="F">F</option>
            </select>
            <input type="number" min="0" name="price" class="box" placeholder="Enter product price" required>
            <input type="file" name="image" accept="image/jpg, image/png, image/jpeg" class="box" required>
            <input type="submit" value="Add Item To Store" name="add_product" class="btn">
        </form>

    </section>
    <!--product CRUD section ends-->

    <!--show products-->

    <section class="show-products">

        <div class="box-container">

            <?php
            $select_products = mysqli_query($conn, "SELECT * FROM `clothes`") or die("query failed");

            if (mysqli_num_rows($select_products) > 0) {
                while ($fetch_products = mysqli_fetch_assoc($select_products)) {
            ?>
            <div class="box">
                <img src="uploaded_img/<?php echo $fetch_products['image']; ?>" alt="">
                <div class="name"><?php echo $fetch_products['name']; ?></div>
                <div class="price">R<?php echo $fetch_products['price']; ?></div>
                <a href="admin_products.php?delete=<?php echo $fetch_products['id']; ?>" class="delete-btn"
                    onclick="return confirm('Delete this product?');">Delete</a>
            </div>
            <?php
                }
            } else {
                echo '<p class="empty">no products added yet!</p>';
            }
            ?>
        </div>
    </section>

    <!--admin js file link-->
    <script src="js/script.js"></script>
</body>

</html>