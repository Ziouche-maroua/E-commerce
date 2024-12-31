<?php

include 'config.php';

session_start();

$user_id = $_SESSION['user_id'];

if(!isset($user_id)){
   header('location:login.php');
}

if(isset($_POST['add_to_cart'])){

   $product_name = $_POST['product_name'];
   $product_price = $_POST['product_price'];
   $product_image = $_POST['product_image'];
   $product_quantity = $_POST['product_quantity'];

   $check_cart_numbers = mysqli_query($conn, "SELECT * FROM `cart` WHERE name = '$product_name' AND user_id = '$user_id'") or die('query failed');

   if(mysqli_num_rows($check_cart_numbers) > 0){
      $message[] = 'already added to cart!';
   }else{
      mysqli_query($conn, "INSERT INTO `cart`(user_id, name, price, quantity, image) VALUES('$user_id', '$product_name', '$product_price', '$product_quantity', '$product_image')") or die('query failed');
      $message[] = 'product added to cart!';
   }

}

// Handle the search functionality
$search_item = '';
if(isset($_POST['submit'])) {
   $search_item = $_POST['search'];
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Shop</title>

   <!-- font awesome cdn link  -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

   <!-- Tailwind CSS -->
   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>

<?php include 'header.php'; ?>

<!-- Search Form Section -->
<section class="search-form p-4">
   <form action="" method="post" class="flex justify-center items-center gap-4">
      <input type="text" name="search" value="<?php echo $search_item; ?>" placeholder="Search products..." class="w-full max-w-md p-3 rounded-lg border-2 border-gray-300">
      <input type="submit" name="submit" value="Search" class="btn px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200">
   </form>
</section>



<!-- Products Section -->
<section class="products py-12 bg-gray-100">

   <h1 class="text-4xl font-bold text-center mb-8">Latest Products</h1>

   <div class="box-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

   <?php  
      // Modify the product query based on the search term
      if ($search_item != '') {
         $select_products = mysqli_query($conn, "SELECT * FROM `products` WHERE name LIKE '%{$search_item}%'") or die('query failed');
      } else {
         $select_products = mysqli_query($conn, "SELECT * FROM `products`") or die('query failed');
      }
      
      if(mysqli_num_rows($select_products) > 0){
         while($fetch_products = mysqli_fetch_assoc($select_products)){
   ?>
         <form action="" method="post" class="box bg-white shadow-md rounded-lg overflow-hidden">
            <img class="w-full h-48 object-cover" src="uploaded_img/<?php echo $fetch_products['image']; ?>" alt="">
            <div class="p-4">
               <h3 class="text-xl font-semibold"><?php echo $fetch_products['name']; ?></h3>
               <p class="text-gray-500 mt-1">$<?php echo $fetch_products['price']; ?>/-</p>
               <input type="number" min="1" name="product_quantity" value="1" class="mt-4 border rounded-lg px-2 py-1 w-full">
               <input type="hidden" name="product_name" value="<?php echo $fetch_products['name']; ?>">
               <input type="hidden" name="product_price" value="<?php echo $fetch_products['price']; ?>">
               <input type="hidden" name="product_image" value="<?php echo $fetch_products['image']; ?>">
               <input type="submit" value="Add to Cart" name="add_to_cart" class="btn mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            </div>
         </form>
      <?php
         }
      }else{
         echo '<p class="col-span-full text-center text-gray-500">No products found!</p>';
      }
      ?>
   </div>

</section>

<!-- Custom JS file link -->
<script src="js/script.js"></script>

</body>
</html>
