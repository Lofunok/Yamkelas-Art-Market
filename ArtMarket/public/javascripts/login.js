function submitForm() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    
    //send data to backend
    ("http://localhost:5000/user/Createuser",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, surname: surname, username: username, password:password ,age:age, email: email, usertype: userType,bio: bio,phonenumber: number })
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
                window.location.href = 'login.html';
                break;
    }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
document.getElementById("register").addEventListener("submit", submitForm);