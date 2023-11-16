<?php
if (isset($message)) {
    foreach ($message as $message) {
        echo '
      <div class="message">
         <span>' . $message . '</span>
         <i class="fas fa-times" onclick="this.parentElement.remove();"></i>
      </div>
      ';
    }
}
?>

<header class="header">



    <div class="header-2">
        <div class="flex">
            <img id="logo-display" src="images/vintage_logo.png" alt="">
            <a id="name-display" href="home.php" class="logo">Vintage Society.</a>

            <nav class="navbar">
                <a href="home.php">Home</a>
                <a href="men.php">Men</a>
                <a href="women.php">Women</a>
                <a href="orders.php">Orders</a>
                <a href="contact.php">Message</a>
                <a href="about.php">About</a>
            </nav>

            <div class="icons">
                <div id="menu-btn" class="fas fa-bars"></div>
                <a href="search_page.php"><i class="fa-solid fa-magnifying-glass"></i></a>



                <?php
                $select_cart_number = mysqli_query($conn, "SELECT * FROM `cart` WHERE user_id = '$user_id'") or die('query failed');
                $cart_rows_number = mysqli_num_rows($select_cart_number);
                ?>
                <a href="cart.php"> <i class="fab fa-opencart"></i> <span>(<?php echo $cart_rows_number; ?>)</span>
                </a>

            </div>
            <div class="theme-btn">
                <i class="fas fa-adjust"></i>
            </div>
        </div>
    </div>

    <div class="header-1">
        <div class="flex">
            <p>
                <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Log Out</a>
            </p>
        </div>
    </div>

</header>