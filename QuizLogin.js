let form = document.querySelector('form');
let user = document.querySelectorAll('input')[0];
let password = document.querySelectorAll('input')[1];

let eUser = document.querySelectorAll('span')[0];
let ePass = document.querySelectorAll('span')[1];
let eForm = document.querySelectorAll('span')[2];

let dataFromLocalStorage = JSON.parse(localStorage.getItem('data'));

form.addEventListener('submit', (e) => {
    eUser.innerHTML = "";
    ePass.innerHTML = "";
    eForm.innerHTML = "";

    let matching = dataFromLocalStorage.find(entry => 
        (entry.mobile == user.value || entry.email == user.value) && entry.password == password.value
    );

    if (!user.value && !password.value) {
        eUser.innerHTML = "Email or Mobile number is required";
        ePass.innerHTML = "Password is required";
        e.preventDefault();
    } else if (!user.value) {
        eUser.innerHTML = "Email or Mobile number is required";
        e.preventDefault();
    } else if (!password.value) {
        ePass.innerHTML = "Password is required";
        e.preventDefault();
    } else if (matching) {
        alert("Login Successful!");
        localStorage.setItem("oneuser", JSON.stringify(matching));
    } else {
        eForm.innerHTML = "User credentials are incorrect";
        e.preventDefault();
    }
});
