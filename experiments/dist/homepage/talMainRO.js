"use strict";
// // -------------------- GLOBAL STATE --------------------
// let emailFetchedTM = "";
// let restaurantName = "";
// let resNameFile = "";
// // -------------------- UTILITIES --------------------
// //  const $ = (selector: string) =>
// //   document.querySelector(selector) as HTMLElement | null;
// const toggleClass = (el: Element | null, className: string) =>
//   el?.classList.toggle(className);
// const addClass = (el: Element | null, className: string) =>
//   el?.classList.add(className);
// const removeClass = (el: Element | null, className: string) =>
//   el?.classList.remove(className);
// const hasClass = (el: Element | null, className: string) =>
//   el?.classList.contains(className);
// const resetForm = (formId: string) =>
//   (document.getElementById(formId) as HTMLFormElement)?.reset();
// const toggleOpacityDim = () => {
//   document.documentElement.classList.toggle("opacity-dim");
//   $(".section-nav").toggleClass("opacity-dim");
//   $(".section-header").toggleClass("opacity-dim");
// };
// // const toggleHiddenElements = (...elements: (HTMLElement | null)[]) =>
// //   elements.forEach((el) => toggleClass(el, "hiddenx2"));
// // -------------------- ACCORDIONS --------------------
// document.querySelectorAll<HTMLElement>(".accordion").forEach((acc) => {
//   acc.addEventListener("click", function () {
//     this.classList.toggle("active");
//     const panel = this.nextElementSibling as HTMLElement | null;
//     if (!panel) return;
//     const isOpen = panel.style.display === "block";
//     panel.style.display = isOpen ? "none" : "block";
//     panel.style.maxHeight = isOpen ? "" : `${panel.scrollHeight}px`;
//   });
// });
// // -------------------- RESTAURANT SELECTION --------------------
// $(".pizza1").on("click", function (e) {
//   e.preventDefault();
//   restaurantName = "Papa John's Pizza";
//   resNameFile = "pj2";
// });
// // -------------------- TOGGLE NAVIGATION --------------------
// $(".o3").on("click", function () {
//   $(".nav-links").toggleClass("hidden");
//   $(".h1-h").toggleClass("hidden");
//   $(".header-p").toggleClass("hidden");
// });
// // -------------------- LOGIN/LOGOUT TOGGLES --------------------
// const toggleLogin = () => {
//   $(".login").toggleClass("hiddenx2");
//   toggleOpacityDim();
// };
// const toggleLogout = () => {
//   $(".logout").toggleClass("hiddenx2");
//   toggleOpacityDim();
// };
// const toggleLogoutFr = () => {
//   emailFetchedTM = "";
//   localStorage.clear();
//   console.log("emailFetchedTM should be empty now.");
//   toggleLogout();
// };
// const toggleLoginFetch = () => {
//   fetch("/api/email")
//     .then((res) => res.json())
//     .then((data) => {
//       emailFetchedTM = data.email;
//       console.log("Logged in as:", emailFetchedTM);
//     })
//     .catch(console.error);
//   toggleLogin();
// };
// // -------------------- LOGIN/LOGOUT EVENTS --------------------
// $(".login-icon").on("click", function (e) {
//   e.preventDefault();
//   resetForm("myForm");
//   if (emailFetchedTM) {
//     toggleLogout();
//   } else {
//     toggleLogin();
//   }
// });
// $(".x").on("click", toggleLogin);
// $(".login-btn").on("click", toggleLoginFetch);
// $(".logout-btn").on("click", toggleLogoutFr);
// // -------------------- LOGIN FORM SUBMISSION --------------------
// const loginForm = document.getElementById("myForm") as HTMLFormElement | null;
// loginForm?.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = (document.getElementById("email") as HTMLInputElement)?.value;
//   const password = (document.getElementById("password") as HTMLInputElement)
//     ?.value;
//   try {
//     const res = await fetch("http://localhost:3000/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await res.json();
//     alert(data.message);
//   } catch (err) {
//     alert("Error: " + (err as Error).message);
//   }
//   // Optional: also send to /submit
//   const formData = new FormData(loginForm);
//   const formJson = Object.fromEntries(formData.entries());
//   fetch("/submit", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formJson),
//   }).catch(console.error);
// });
// // Utility function: toggle hidden class on multiple jQuery elements
// function toggleHiddenElements(...elements: JQuery<HTMLElement>[]) {
//   elements.forEach((el) => el.toggleClass("hiddenx2"));
// }
// // -------------------- CREATE ACCOUNT --------------------
// $(".create-acc-link").on("click", () => {
//   toggleHiddenElements($(".create-acc-popup"), $(".login"));
//   resetForm("myFormCreateAcc");
// });
// $(".x2").on("click", () => {
//   toggleHiddenElements(
//     $(".create-acc-form"),
//     $(".hdr2"),
//     $(".msg2"),
//     $(".create-acc-popup"),
//     $(".login")
//   );
// });
// $(".create-acc-btn").on("click", async () => {
//   const emailInput = $("#email2").val() as string | undefined;
//   const $message = $("#message2");
//   if (!emailInput || $message.length === 0) return;
//   try {
//     const response = await fetch("./Users_export.json");
//     const users = await response.json();
//     const exists = users.some((user: any) => user.email === emailInput);
//     $message
//       .text(
//         exists
//           ? "Email already exists!"
//           : "Account created successfully! Please login."
//       )
//       .css("color", "black");
//     toggleHiddenElements($(".create-acc-form"), $(".hdr2"), $(".msg2"));
//   } catch (error) {
//     console.error("Error checking email:", error);
//   }
// });
// // -------------------- SEARCH --------------------
// $(".search-btn").on("click", (e) => {
//   e.preventDefault();
//   const input = ($("#searchInput").val() as string | undefined)
//     ?.trim()
//     .toLowerCase();
//   const pizzaPage = $(".pizza");
//   const pastaPage = $(".pasta");
//   const bigContainer = $(".container");
//   const showPage = (
//     show: JQuery<HTMLElement>,
//     hide1: JQuery<HTMLElement>,
//     hide2: JQuery<HTMLElement>
//   ) => {
//     hide1.addClass("hiddenx2");
//     hide2.addClass("hiddenx2");
//     show.removeClass("hiddenx2");
//     resetForm("searchForm");
//   };
//   if (input === "pizza") showPage(pizzaPage, pastaPage, bigContainer);
//   if (input === "pasta") showPage(pastaPage, pizzaPage, bigContainer);
// });
// // -------------------- MAIN PAGE RESET --------------------
// $(".main").on("click", () => {
//   const pizzaPage = $(".pizza");
//   const pastaPage = $(".pasta");
//   const bigContainer = $(".container");
//   pizzaPage.addClass("hiddenx2");
//   pastaPage.addClass("hiddenx2");
//   bigContainer.removeClass("hiddenx2");
// });
// // -------------------- REDIRECT HANDLER --------------------
// const redirectInterval = setInterval(() => {
//   if (resNameFile) {
//     const url = `/pjpage/${resNameFile}.html?restaurantName=${encodeURIComponent(
//       restaurantName
//     )}`;
//     console.log("Redirecting to:", url);
//     window.location.href = url;
//     clearInterval(redirectInterval);
//   }
// }, 500);
