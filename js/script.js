let userBox = document.getElementById('user-box');  // Get the user box element
let userBtn = document.getElementById('user-btn');  // Get the user button

if (userBtn && userBox) {
    userBtn.onclick = () => {
        userBox.classList.toggle('hidden');  // Toggle the hidden class to show/hide the user box
    };

    

    window.onscroll = () => {
        userBox.classList.add('hidden');  // Hide user box on scroll
    };
}
