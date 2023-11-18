<?php

include 'configure.php';

session_start();
$admin_id = $_SESSION['admin_id'];

//If user does not login, return to login page
if (!isset($admin_id)) {
    header('location:login.php');
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel</title>

    <!-- font awesome cdn link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!--Custom admin page css file-->
    <link rel="stylesheet" href="css/admin_style.css">
</head>

<body class="theme-color">

    <?php include 'admin_header.php'; ?>


    <!--admin dashboard section start -->
    <section class="dashboard">

        <h1 class="title">Summary</h1>
        <div class="box-container">
            <div class="box">
                <?php
                $total_pendings = 0;
                $select_pending = mysqli_query($conn, "SELECT total_price FROM `orders` WHERE payment_status = 'pending'") or die('query failed');

                if (mysqli_num_rows($select_pending) > 0) {
                    while ($fetch_pendings = mysqli_fetch_assoc($select_pending)) {
                        $total_price = $fetch_pendings['total_price'];
                        $total_pendings += $total_price;
                    };
                };
                ?>
                <h3><?php echo "R" . $total_pendings; ?></h3>
                <a href="admin_orders.php">
                    <p>Transactions Pending</p>
                </a>
            </div>

            <div class="box">
                <?php
                $total_completed = 0;
                $select_completed = mysqli_query($conn, "SELECT total_price FROM `orders` WHERE payment_status = 'completed'") or die('query failed');

                if (mysqli_num_rows($select_completed) > 0) {
                    while ($fetch_completed = mysqli_fetch_assoc($select_completed)) {
                        $total_price = $fetch_completed['total_price'];
                        $total_completed += $total_price;
                    };
                };
                ?>
                <h3><?php echo "R" . $total_completed; ?></h3>
                <a href="admin_orders.php">
                    <p>Completed Payments</p>
                </a>
            </div>


            <div class="box">
                <?php
                $select_orders = mysqli_query($conn, "SELECT * FROM `orders`") or die('query failed');
                $number_of_orders = mysqli_num_rows($select_orders);
                ?>
                <h3><?php echo $number_of_orders; ?></h3>
                <a href="admin_orders.php">
                    <p>Orders Placed</p>
                </a>
            </div>



            <div class="box">
                <?php
                $select_users = mysqli_query($conn, "SELECT * FROM `accounts` WHERE type = 'user'") or die('query failed');
                $number_of_users = mysqli_num_rows($select_users);
                ?>
                <h3><?php echo $number_of_users; ?></h3>
                <a href="admin_users.php">
                    <p>No. of User Accounts</p>
                </a>
            </div>

            <div class="box">
                <?php
                $select_admins = mysqli_query($conn, "SELECT * FROM `accounts` WHERE type = 'admin'") or die('query failed');
                $number_of_admins = mysqli_num_rows($select_admins);
                ?>
                <h3><?php echo $number_of_admins; ?></h3>
                <a href="admin_users.php">
                    <p>No. of Admin Accounts</p>
                </a>
            </div>

            <div class="box">
                <?php
                $select_accounts = mysqli_query($conn, "SELECT * FROM `accounts`") or die('query failed');
                $number_of_accounts = mysqli_num_rows($select_accounts);
                ?>
                <h3><?php echo $number_of_accounts; ?></h3>
                <a href="admin_users.php">
                    <p>Total No. of Users</p>
                </a>
            </div>

            <div class="box">
                <?php
                $select_messages = mysqli_query($conn, "SELECT * FROM `messages`") or die('query failed');
                $number_of_messages = mysqli_num_rows($select_messages);
                ?>
                <h3><?php echo $number_of_messages; ?></h3>
                <a href="admin_contacts.php">
                    <p>Messages</p>
                </a>
            </div>

        </div>

    </section>
    <!--admin dashboard section end -->

    <!--admin js file link-->
    <script src="js/admin_script.js"></script>
</body>

</html>