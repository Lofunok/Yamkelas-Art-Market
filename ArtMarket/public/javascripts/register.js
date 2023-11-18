    document.getElementById("register").addEventListener("submit", submitForm);

    async function submitForm() {
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cpassword = document.getElementById("cpassword").value;
    let username = document.getElementById("username").value;
    let bio = document.getElementById("bio").value;
    let number = document.getElementById("phonenumber").value;
    let age = parseInt(document.getElementById("age").value);
    let usertype = document.getElementById("usertype").value;
   
    const endpoint = new URL("http://localhost:3000/user/Createuser");
    //send data to backend
    const response = await fetch(endpoint,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name , surname: surname, username: username, password: password, age: age, email: email, usertype: usertype, bio: bio, phonenumber: number })
    })

    const data = await response.json();
    console.log(data)
    switch (data.usertype) {
        case 'admin':
            window.location.href = '';
            break;
        case 'user':
            location.replace('http://localhost:3000/');
            break;
        case 'seller':
            location.replace('http://localhost:3000/');
            break;
    };
    
}


