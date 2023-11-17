function submitForm() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    
    //send data to backend
    ("http://localhost:3000/user/finduser",{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username, password: password})
    })
    const isSuccessful = response.ok;
    if (isSuccessful){
        window.location.href = 'register.html';
    }
}
document.getElementById("register").addEventListener("submit", submitForm);