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

<header class="header">



    <div class="header-2">
        <div class="flex">
            <img id="logo-display" src="images/vintage_logo.png" alt="">
                <a id="name-display" href="admin_page.php" class="logo">Admin Controls Center</a>

                <nav class="navbar">
                    <a href="admin_page.php">Dashboard</a>
                    <a href="admin_products.php">Products</a>
                    <a href="admin_orders.php">Orders</a>
                    <a href="admin_users.php">Users</a>
                    <a href="admin_contacts.php">Messages</a>
                </nav>

                <div class="icons">
                    <div id="menu-btn" class="fas fa-bars"></div>
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