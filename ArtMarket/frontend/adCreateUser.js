function adCreateUserFunc(e) {

    e.preventDefault();

    var userName = document.getElementById("name").value;
    var userSurname = document.getElementById("surname").value;
    var userUsername = document.getElementById("username").value;
    var userPassword = document.getElementById("password").value;
    var userAge = document.getElementById("age").value;
    var userEmail = document.getElementById("email").value;
    var userUserType = document.getElementById("usertype").value;
    var userBio = document.getElementById("bio").value;
    var userPhoneNumber = document.getElementById("phonenumber").value;

    // log the value of userName
    console.log("userName: " + userName);

    const formData = new FormData();
    formData.append('name', userName);
    formData.append('surname', userSurname);
    formData.append('username', userUsername);
    formData.append('password', userPassword);
    formData.append('age', userAge);
    formData.append('email', userEmail);
    formData.append('usertype', userUserType);
    formData.append('bio', userBio);
    formData.append('phonenumber', userPhoneNumber);

    fetch("http://localhost:5000/user/Createuser", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData))
    })

        .then(response => {

            // log the response
            console.log("response: " + response);

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })

        .then(json => {
            let resultDiv = document.getElementById("createUserResult");
            resultDiv.innerHTML = JSON.stringify(json);
        })

        .catch(error => {
            let resultDiv = document.getElementById("createUserResult");
            resultDiv.innerHTML = "An error occurred: " + error.message;
        });

}
