"use strict";
// ----- Utility functions -----
const toggleClass = (el, className) => el.classList.toggle(className);
const addClass = (el, className) => el.classList.add(className);
const removeClass = (el, className) => el.classList.remove(className);
const hasClass = (el, className) => el.classList.contains(className);
const resetForm = (formId) => {
    const form = document.getElementById(formId);
    form?.reset();
};
// ----- Variables -----
let restaurantName = "";
let resNameFile = "";
// ----- Restaurant Selection -----
const papaJohns = document.querySelector(".pizza1");
papaJohns?.addEventListener("click", (e) => {
    e.preventDefault();
    restaurantName = "Papa John's Pizza";
    resNameFile = "pj2";
    // Navigation is triggered outside the event listener (handled below)
});
// ----- Accordion Functionality -----
const accordions = document.querySelectorAll(".accordion");
accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
        this.classList.toggle("active");
        const panel = this.nextElementSibling;
        if (!panel)
            return;
        if (panel.style.display === "block") {
            panel.style.display = "none";
            panel.style.maxHeight = "";
        }
        else {
            panel.style.display = "block";
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
});
// ----- Toggle Navigation and Header -----
const flowers = document.querySelector(".o3");
const navLinks = document.querySelector(".nav-links");
const h1H = document.querySelector(".h1-h");
const headerP = document.querySelector(".header-p");
flowers?.addEventListener("click", () => {
    navLinks?.classList.toggle("hidden");
    h1H?.classList.toggle("hidden");
    headerP?.classList.toggle("hidden");
});
// ----- Login and Create Account Elements -----
const loginIcon = document.querySelector(".login-icon");
const loginDiv = document.querySelector(".login");
const html = document.documentElement;
const sectionNav = document.querySelector(".section-nav");
const headerSection = document.querySelector(".section-header");
const closeBtn = document.querySelector(".x");
const loginBtn = document.querySelector(".login-btn");
const createAccBtn = document.querySelector(".create-acc-btn");
const createAccDiv = document.querySelector(".create-acc-popup");
const closeBtnCreateAcc = document.querySelector(".x2");
const createAccLink = document.querySelector(".create-acc-link");
const createAccForm = document.querySelector(".create-acc-form");
const createAccHdr = document.querySelector(".hdr2");
const createAccMsg = document.querySelector(".msg2");
// ----- Login Icon Toggle -----
const toggleLogin = () => {
    loginDiv?.classList.toggle("hiddenx2");
    html.classList.toggle("opacity-dim");
    sectionNav?.classList.toggle("opacity-dim");
    headerSection?.classList.toggle("opacity-dim");
    resetForm("myForm");
};
loginIcon?.addEventListener("click", (e) => {
    e.preventDefault();
    toggleLogin();
});
closeBtn?.addEventListener("click", toggleLogin);
loginBtn?.addEventListener("click", toggleLogin);
// ----- Login Form Submission -----
const loginForm = document.getElementById("myForm");
loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")
        ?.value;
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => res.json())
        .then((data) => alert(data.message))
        .catch((err) => alert("Error: " + err.message));
});
// ----- Generic Form Submit Handler for /submit -----
loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then(() => {
        // Optionally alert success here
    })
        .catch(console.error);
});
// ----- Create Account Popup Toggle -----
createAccLink?.addEventListener("click", () => {
    createAccDiv?.classList.toggle("hiddenx2");
    loginDiv?.classList.toggle("hiddenx2");
    resetForm("myForm");
});
closeBtnCreateAcc?.addEventListener("click", () => {
    createAccForm?.classList.toggle("hiddenx2");
    createAccHdr?.classList.toggle("hiddenx2");
    createAccMsg?.classList.toggle("hiddenx2");
    createAccDiv?.classList.toggle("hiddenx2");
    loginDiv?.classList.toggle("hiddenx2");
});
// ----- Check Email on Account Creation -----
async function checkEmail() {
    const emailInput = document.getElementById("email2")
        ?.value;
    const message = document.getElementById("message2");
    if (!emailInput || !message)
        return;
    try {
        const response = await fetch("Users_export.json");
        const users = await response.json();
        const exists = users.some((user) => user.email === emailInput);
        if (exists) {
            message.textContent = "Email already exists!";
            message.style.color = "black";
        }
        else {
            message.textContent = "Account created successfully! Please login.";
            message.style.color = "black";
        }
        createAccForm?.classList.toggle("hiddenx2");
        createAccHdr?.classList.toggle("hiddenx2");
        createAccMsg?.classList.toggle("hiddenx2");
    }
    catch (error) {
        console.error("Error checking email:", error);
    }
}
createAccBtn?.addEventListener("click", checkEmail);
// ----- Page Sections & Search -----
const pizzaPage = document.querySelector(".pizza");
const pastaPage = document.querySelector(".pasta");
const bigContainer = document.querySelector(".container");
const searchBtn = document.querySelector(".search-btn");
searchBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.getElementById("searchInput")?.value
        .trim()
        .toLowerCase();
    if (input === "pizza") {
        pastaPage &&
            !hasClass(pastaPage, "hiddenx2") &&
            addClass(pastaPage, "hiddenx2");
        bigContainer &&
            !hasClass(bigContainer, "hiddenx2") &&
            addClass(bigContainer, "hiddenx2");
        pizzaPage?.classList.remove("hiddenx2");
        resetForm("searchForm");
    }
    if (input === "pasta") {
        pizzaPage &&
            !hasClass(pizzaPage, "hiddenx2") &&
            addClass(pizzaPage, "hiddenx2");
        bigContainer &&
            !hasClass(bigContainer, "hiddenx2") &&
            addClass(bigContainer, "hiddenx2");
        pastaPage?.classList.remove("hiddenx2");
        resetForm("searchForm");
    }
});
// ----- Main Page Click Handler -----
const mainPage = document.querySelector(".main");
mainPage?.addEventListener("click", () => {
    pizzaPage &&
        !hasClass(pizzaPage, "hiddenx2") &&
        addClass(pizzaPage, "hiddenx2");
    pastaPage &&
        !hasClass(pastaPage, "hiddenx2") &&
        addClass(pastaPage, "hiddenx2");
    bigContainer &&
        hasClass(bigContainer, "hiddenx2") &&
        removeClass(bigContainer, "hiddenx2");
});
// ----- Redirect when resNameFile is set -----
const redirectInterval = setInterval(() => {
    if (resNameFile) {
        console.log("Redirecting to:", resNameFile);
        window.location.href = `/pjpage/${resNameFile}.html?restaurantName=${encodeURIComponent(restaurantName)}`;
        clearInterval(redirectInterval);
    }
}, 500);
