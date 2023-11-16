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

async function submitForm() {
    
    //send data to backend
    fetch("http://localhost:5000/user/Createuser",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, surname: surname, username: username, password:password,age:age,email: email, usertype: userType,bio: bio,phonenumber: number })
    })
    .then(response => response.json())
    .then(data => {
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
document.getElementById("register").addEventListener("submit", submitForm);