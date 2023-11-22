function editProfile(e) {

    e.preventDefault();

    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let password = document.getElementById("password").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let bio = document.getElementById("bio").value;
    let phone = document.getElementById('phone').value;

    const username = encodeURIComponent(sessionStorage.getItem('username'));
    const pass = encodeURIComponent(sessionStorage.getItem('password'));
    const userid = encodeURIComponent(sessionStorage.getItem('userId'));


    fetch(`http://localhost:5000/user/Finduser/${username}/${pass}`)
        .then(response => response.json())
        .then(user => {
            if (user.length > 0) {
                console.log('User Data:', user);
            }

            let userName = user[0].name || '';  // Use default value if user.name is undefined
            let userSurname = user[0].surname || '';
            let userPassword = user[0].password || '';
            let userAge = user[0].age || '';
            let userEmail = user[0].email || '';
            let userBio = user[0].bio || '';
            let userPhone = user[0].phonenumber || '';


            if (name) {
                userName = name;
                console.log(userName)
            }
            if (surname) {
                userSurname = surname;
            }
            if (password) {
                userPassword = password;
            }
            if (age) {
                userAge = age;
            }
            if (email) {
                userEmail = email;
            }
            if (bio) {
                userBio = bio;
            }
            if (phone) {
                userPhone = phone;
            }

            const formData = new FormData();
            formData.append('name', userName);
            formData.append('surname', userSurname);
            formData.append('password', userPassword);
            formData.append('age', userAge);
            formData.append('email', userEmail);
            formData.append('bio', userBio);
            formData.append('phonenumber', userPhone);
            formData.append('userid', userid);

            for (const pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            return fetch("http://localhost:5000/user/Updateuser", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userName,
                    surname: userSurname,
                    password: userPassword,
                    age: userAge,
                    email: userEmail,
                    bio: userBio,
                    phonenumber: userPhone,
                    userid: userid,
                }),
            });
            
        })
        .then(response => response.json())
        .then(data => {
            console.log('Profile updated successfully:', data);
            alert('Profile updated succesfully');
            history.back() 
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });
}

document.getElementById('editProfile').addEventListener('click', (e) => editProfile(e));