document.getElementById("login").addEventListener("submit", function (event) {
    event.preventDefault();
    submitForm();
});

function submitForm() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;

    // Validation 
    fetch(`http://localhost:5000/user/users`) 
     .then(response => response.json())
        .then(users => {
            for (let i = 0; i < users.length; i++) {
                if ((username === users[i].username) && (password === users[i].password)) {
                    console.log(users[i].usertype);
                    sessionStorage.setItem('userId', users[i].userid);
                    switch (users[i].usertype) {
                        case 'admin':
                            window.location.href = 'adminDashboard.html';
                            break;
                        case 'user':
                            window.location.href = 'Home.html';
                            break;
                        case 'seller':
                            window.location.href = 'seller.html';
                            break;
                    }
                }
            
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });
}


