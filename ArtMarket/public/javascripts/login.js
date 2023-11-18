document.getElementById("register").addEventListener("submit", submitForm);
async function submitForm() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    
    const endpoint = new URL("http://localhost:3000/user/finduser");
    //send data to backend
    (URL,{
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
