function submitForm() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let username = document.getElementById("username").value;
    let bio = document.getElementById("bio").value;
    let number = document.getElementById("phoneNumber").value;
    let age = document.getElementById("age").value;
    let userType = document.getElementById("user_type").value;

    // Validation 
    fetch(`http://localhost:5000/user/users`)
        .then(response => response.json())
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                if (username === users[i].username) {
                    alert('Username exists, please enter a new username');
                    return;
                } else if (email === users[i].email) {
                    alert('This email address is already registered');
                    return;
                } else if (number === users[i].phonenumber){
                    alert('This phone number is already registered')
                    return;
                }
            }

            if (password !== cpassword) {
                alert('Passwords do not match');
                return;
            } else if (age < 18) {
                alert('You are underage');
                return;
            }

            // Send data to backend
            return fetch("http://localhost:5000/user/Createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    username: username,
                    password: password,
                    age: age,
                    email: email,
                    usertype: userType,
                    bio: bio,
                    phonenumber: number
                })
            });
        })
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);

            console.log(data);

            switch (userType) {
                case 'admin':
                    window.location.href = '';
                    break;
                case 'user':
                    window.location.href = '';
                    break;
                case 'seller':
                    window.location.href = 'seller.html';
                    break;
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById("register").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
});
