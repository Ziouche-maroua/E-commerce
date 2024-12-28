let adminBox = document.getElementById('admin-box');  // Get the admin box element
let adminBtn = document.getElementById('admin-btn');  // Get the admin button

if (adminBtn && adminBox) {
    adminBtn.onclick = () => {
        adminBox.classList.toggle('hidden');  // Toggle the hidden class to show/hide the admin box
    };

    

    window.onscroll = () => {
        adminBox.classList.add('hidden');  // Hide admin box on scroll
    };
}





// let navbar = document.querySelector('.header .navbar');
// let accountBox = document.querySelector('.header .account-box');

// document.querySelector('#menu-btn').onclick = () =>{
//    navbar.classList.toggle('active');
//    accountBox.classList.remove('active');
// }

// document.querySelector('#user-btn').onclick = () =>{
//    accountBox.classList.toggle('active');
//    navbar.classList.remove('active');
// }

// window.onscroll = () =>{
//    navbar.classList.remove('active');
//    accountBox.classList.remove('active');
// }

// document.querySelector('#close-update').onclick = () =>{
//    document.querySelector('.edit-product-form').style.display = 'none';
//    window.location.href = 'admin_products.php';
// }