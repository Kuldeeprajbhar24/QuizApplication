let FirstName = document.querySelectorAll("input")[0];
let LastName = document.querySelectorAll("input")[1];
let EmailId = document.querySelectorAll("input")[2];
let MobileNumber = document.querySelectorAll("input")[3];
let Password = document.querySelectorAll("input")[4];
let ConfirmPassword = document.querySelectorAll("input")[5];
let Form = document.querySelector("form");

let eFirstName = document.querySelectorAll("span")[0];
let eLastName = document.querySelectorAll("span")[1];
let eEmailId = document.querySelectorAll("span")[2];
let eMobileNumber = document.querySelectorAll("span")[3];
let ePassword = document.querySelectorAll("span")[4];
let eConfirmPassword = document.querySelectorAll("span")[5];

//! Store data
let AllData = JSON.parse(localStorage.getItem("data")) || [];

Form.addEventListener("submit", (e) => {
    let flag = true;

    //! Mobile number uniqueness check
    let MobileMatching = AllData.find(entry => entry.mobile === MobileNumber.value);
    if (MobileMatching) {
        eMobileNumber.innerHTML = "Mobile number already exists";
        flag = false;
        e.preventDefault();
    }

    //! Email uniqueness check
    let EmailMatching = AllData.find(entry => entry.email === EmailId.value);
    if (EmailMatching) {
        eEmailId.innerHTML = "Email already exists";
        flag = false;
        e.preventDefault();
    }

    //! First Name Validation
    let regxFirstName = /^[a-zA-Z]{2,15}$/;
    if (!regxFirstName.test(FirstName.value)) {
        eFirstName.innerHTML = "First name should be 2-15 characters long";
        flag = false;
        e.preventDefault();
    }

    //! Last Name Validation
    let regxLastName = /^[a-zA-Z]{2,15}$/;
    if (!regxLastName.test(LastName.value)) {
        eLastName.innerHTML = "Last name should be 2-15 characters long";
        flag = false;
        e.preventDefault();
    }

    //!Mobile Number Validation
    let regxMobile = /^[6-9][0-9]{9}$/;
    if (!regxMobile.test(MobileNumber.value)) {
        eMobileNumber.innerHTML = "Mobile number should be 10 digits and start with 6-9";
        flag = false;
        e.preventDefault();
    }

    //! Password Validation
    let regxPassword = /^[a-zA-Z0-9]{6,20}$/;
    if (!regxPassword.test(Password.value)) {
        ePassword.innerHTML = "Password should be 6-20 characters without special characters";
        flag = false;
        e.preventDefault();
    }

    //! Confirm Password Validation
    if (Password.value !== ConfirmPassword.value) {
        eConfirmPassword.innerHTML = "Passwords do not match";
        flag = false;
        e.preventDefault();
    }

    if (flag) {
        let obj = {
            first: FirstName.value,
            last: LastName.value,
            email: EmailId.value,
            mobile: MobileNumber.value,
            password: Password.value,
            quiz: null,
        };
        AllData.push(obj);
        localStorage.setItem("data", JSON.stringify(AllData));
    }
});
