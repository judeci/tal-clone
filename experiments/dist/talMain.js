"use strict";
let restaurantName = "";
const papaJohns = document.querySelector(".pizza1");
let resNameFile = "";
papaJohns.addEventListener("click", function (e) {
    e.preventDefault();
    restaurantName = "Papa John's Pizza";
    resNameFile = "pj2";
    // resNameFile = 'papajohns';
    // window.location.href = `papajohns.html?restaurantName=${encodeURIComponent(restaurantName)}`;
    // need to put this line out of this fn !!!!!!! want it fully independent
});
var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        }
        else {
            panel.style.display = "block";
        }
        if (panel.style.maxHeight) {
            panel.style.maxHeight = "";
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
const flowers = document.querySelector(".o3");
const sectionNav = document.querySelector(".section-nav");
const navLinks = document.querySelector(".nav-links");
const h1H = document.querySelector(".h1-h");
const headerP = document.querySelector(".header-p");
const headerSection = document.querySelector(".section-header");
flowers.addEventListener("click", function () {
    navLinks.classList.toggle("hidden");
    h1H.classList.toggle("hidden");
    headerP.classList.toggle("hidden");
});
const loginIcon = document.querySelector(".login-icon");
const loginDiv = document.querySelector(".login");
const body = document.querySelector("body");
const html = document.querySelector("html"); // ? if no delete
const closeBtn = document.querySelector(".x");
const loginBtn = document.querySelector(".login-btn");
const createAccBtn = document.querySelector(".create-acc-btn");
const createAccDiv = document.querySelector(".create-acc-popup");
const closeBtnCreateAcc = document.querySelector(".x2");
const createAccLink = document.querySelector(".create-acc-link");
const createAccForm = document.querySelector(".create-acc-form");
const createAccHdr = document.querySelector(".hdr2");
const createAccMsg = document.querySelector(".msg2");
// loginEmail = document.getElementById('email')
// loginPW = document.getElementById('password')
loginIcon.addEventListener("click", function (e) {
    e.preventDefault();
    loginDiv.classList.toggle("hiddenx2");
    // body.classList.toggle("opacity-dim");
    // test:
    html.classList.toggle("opacity-dim");
    // document.documentElement.classList.toggle("opacity-dim") // test
    sectionNav.classList.toggle("opacity-dim");
    headerSection.classList.toggle("opacity-dim");
    // clear form input fields (login email pw + create acc email pw ? do that when clicking cr acc link)
    document.getElementById("myForm")?.reset();
});
closeBtn.addEventListener("click", function () {
    loginDiv.classList.toggle("hiddenx2");
    // body.classList.toggle("opacity-dim");
    html.classList.toggle("opacity-dim"); // test
    sectionNav.classList.toggle("opacity-dim");
    headerSection.classList.toggle("opacity-dim");
});
loginBtn.addEventListener("click", function () {
    loginDiv.classList.toggle("hiddenx2");
    // body.classList.toggle("opacity-dim");
    html.classList.toggle("opacity-dim"); // test
    sectionNav.classList.toggle("opacity-dim");
    headerSection.classList.toggle("opacity-dim");
});
document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
        // alert("Form submitted!");
    })
        .catch((err) => console.error(err));
});
acc.length;
// create acc hidden stuff:
createAccLink.addEventListener("click", function () {
    createAccDiv.classList.toggle("hiddenx2");
    loginDiv.classList.toggle("hiddenx2");
    document.getElementById("myForm")?.reset();
});
closeBtnCreateAcc.addEventListener("click", function () {
    createAccForm.classList.toggle("hiddenx2");
    createAccHdr.classList.toggle("hiddenx2");
    createAccMsg.classList.toggle("hiddenx2");
    createAccDiv.classList.toggle("hiddenx2");
    loginDiv.classList.toggle("hiddenx2");
});
async function checkEmail() {
    const emailInput = document.getElementById("email2")
        .value;
    const passwordInput = document.getElementById("password2").value;
    let userEmail = null;
    let userPW = null;
    try {
        const response = await fetch("Users_export.json");
        const users = await response.json();
        const foundUser = users.find((user) => user.email === emailInput);
        const exists = !!foundUser;
        if (foundUser) {
            userEmail = foundUser.email;
            userPW = foundUser.password;
        }
        console.log("User found:", foundUser, userEmail, userPW);
        const message = document.getElementById("message2"); // ? or htmlinputele?
        if (exists) {
            message.textContent = "Email already exists!";
            message.style.color = "black";
        }
        else {
            message.textContent = "Account created successfully! Please login.";
            console.log("Acc creatwd");
            message.style.color = "black";
        }
        // Toggle UI components
        createAccForm.classList.toggle("hiddenx2");
        createAccHdr.classList.toggle("hiddenx2");
        createAccMsg.classList.toggle("hiddenx2");
    }
    catch (error) {
        console.error("Error:", error);
    }
}
////////
createAccBtn.addEventListener("click", function () {
    checkEmail();
});
document.getElementById("myForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password")
        .value;
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .catch((err) => alert("Error: " + err.message));
});
const pizzaPage = document.querySelector(".pizza");
const pastaPage = document.querySelector(".pasta");
const bigContainer = document.querySelector(".container");
const searchBtn = document.querySelector(".search-btn");
// const searchF = document.getElementById('searchForm')
searchBtn.addEventListener("click", function () {
    const input = document.getElementById("searchInput").value
        .trim()
        .toLowerCase(); // get input and normalize
    console.log(input);
    if (input === "pizza") {
        if (pastaPage.classList.contains("hiddenx2")) {
        }
        else {
            pastaPage.classList.add("hiddenx2");
        }
        if (bigContainer.classList.contains("hiddenx2")) {
        }
        else {
            bigContainer.classList.add("hiddenx2");
        }
        pizzaPage.classList.remove("hiddenx2");
        document.getElementById("searchForm")?.reset();
    }
    if (input === "pasta") {
        if (pizzaPage.classList.contains("hiddenx2")) {
        }
        else {
            pizzaPage.classList.add("hiddenx2");
        }
        if (bigContainer.classList.contains("hiddenx2")) {
        }
        else {
            bigContainer.classList.add("hiddenx2");
        }
        pastaPage.classList.remove("hiddenx2");
        document.getElementById("searchForm")?.reset();
    }
});
const mainPage = document.querySelector(".main");
mainPage.addEventListener("click", function () {
    if (pizzaPage.classList.contains("hiddenx2")) {
    }
    else {
        pizzaPage.classList.add("hiddenx2");
    }
    if (pastaPage.classList.contains("hiddenx2")) {
    }
    else {
        pastaPage.classList.add("hiddenx2");
    }
    if (bigContainer.classList.contains("hiddenx2")) {
        bigContainer.classList.remove("hiddenx2");
    }
    else {
    }
});
// perma check if resNameFile exists or no:
const intervalFile = setInterval(() => {
    if (resNameFile) {
        console.log("Variable has a value:", resNameFile);
        window.location.href = `${resNameFile}.html?restaurantName=${encodeURIComponent(restaurantName)}`;
        // window.location.href = `${resNameFile}.html?restaurantName=${encodeURIComponent(restaurantName)}`;
        clearInterval(intervalFile); // Stop checking
    }
}, 500);
