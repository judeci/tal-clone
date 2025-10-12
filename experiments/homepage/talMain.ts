let emailFetchedTM: string;

// ----- Utility functions -----
const toggleClass = (el: Element, className: string) =>
  el.classList.toggle(className);
const addClass = (el: Element, className: string) =>
  el.classList.add(className);
const removeClass = (el: Element, className: string) =>
  el.classList.remove(className);
const hasClass = (el: Element, className: string) =>
  el.classList.contains(className);

const resetForm = (formId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  form?.reset();
};

// ----- Variables -----
let restaurantName = "";
let resNameFile = "";

// ----- Restaurant Selection -----
const papaJohns = document.querySelector(".pizza1") as HTMLElement | null;
papaJohns?.addEventListener("click", (e) => {
  e.preventDefault();
  restaurantName = "Papa John's Pizza";
  // resNameFile = "search";
  // resNameFile = "pj2";
  resNameFile = "faq";
});

// ----- Accordion Functionality -----
const accordions = document.querySelectorAll<HTMLElement>(".accordion");
accordions.forEach((acc) => {
  acc.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling as HTMLElement | null;
    if (!panel) return;

    if (panel.style.display === "block") {
      panel.style.display = "none";
      panel.style.maxHeight = "";
    } else {
      panel.style.display = "block";
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// ----- Toggle Navigation and Header -----
const flowers = document.querySelector(".o3") as HTMLElement | null;
const navLinks = document.querySelector(".nav-links") as HTMLElement | null;
const h1H = document.querySelector(".h1-h") as HTMLElement | null;
const headerP = document.querySelector(".header-p") as HTMLElement | null;

flowers?.addEventListener("click", () => {
  navLinks?.classList.toggle("hidden");
  h1H?.classList.toggle("hidden");
  headerP?.classList.toggle("hidden");
});

// ----- Login and Create Account Elements -----
const loginIcon = document.querySelector(".login-icon") as HTMLElement | null;
const loginDiv = document.querySelector(".login") as HTMLElement | null;
const logoutDiv = document.querySelector(".logout") as HTMLElement | null;
const html = document.documentElement;
const sectionNav = document.querySelector(".section-nav") as HTMLElement | null;
const headerSection = document.querySelector(
  ".section-header"
) as HTMLElement | null;
const closeBtn = document.querySelector(".x") as HTMLElement | null;
const loginBtn = document.querySelector(".login-btn") as HTMLElement | null;
const logoutBtn = document.querySelector(".logout-btn") as HTMLElement | null;

const createAccBtn = document.querySelector(
  ".create-acc-btn"
) as HTMLElement | null;
const createAccDiv = document.querySelector(
  ".create-acc-popup"
) as HTMLElement | null;
const closeBtnCreateAcc = document.querySelector(".x2") as HTMLElement | null;
const createAccLink = document.querySelector(
  ".create-acc-link"
) as HTMLElement | null;

const createAccForm = document.querySelector(
  ".create-acc-form"
) as HTMLElement | null;
const createAccHdr = document.querySelector(".hdr2") as HTMLElement | null;
const createAccMsg = document.querySelector(".msg2") as HTMLElement | null;

// ----- Login and logout Icon Toggle -----
const toggleLogin = () => {
  loginDiv?.classList.toggle("hiddenx2");
  html.classList.toggle("opacity-dim");
  sectionNav?.classList.toggle("opacity-dim");
  headerSection?.classList.toggle("opacity-dim");
};

const toggleLoginFetch = () => {
  // if (email&pw r correct) {
  fetch("/api/email")
    .then((res) => res.json())
    .then((data) => {
      console.log("Logged in as:", data.email);
      emailFetchedTM = data.email;
    });
  // } else {
  // }
  loginDiv?.classList.toggle("hiddenx2");
  html.classList.toggle("opacity-dim");
  sectionNav?.classList.toggle("opacity-dim");
  headerSection?.classList.toggle("opacity-dim");

  console.log(
    emailFetchedTM,
    "does this input the prev one? the same as logged in as?"
  );
};

const toggleLogout = () => {
  logoutDiv?.classList.toggle("hiddenx2");
  html.classList.toggle("opacity-dim");
  sectionNav?.classList.toggle("opacity-dim");
  headerSection?.classList.toggle("opacity-dim");
};

const toggleLogoutFr = () => {
  emailFetchedTM = "";
  localStorage.clear();
  console.log('emailFetchedTM shud be "" here.');

  logoutDiv?.classList.toggle("hiddenx2");
  html.classList.toggle("opacity-dim");
  sectionNav?.classList.toggle("opacity-dim");
  headerSection?.classList.toggle("opacity-dim");
};

loginIcon?.addEventListener("click", (e) => {
  e.preventDefault();
  resetForm("myForm");
  console.log(emailFetchedTM, "ERROR HERE");

  if (emailFetchedTM !== "" && emailFetchedTM !== null) {
    toggleLogout();
  } else {
    toggleLogin();
  }
});

closeBtn?.addEventListener("click", toggleLogin);
loginBtn?.addEventListener("click", toggleLoginFetch);

logoutBtn?.addEventListener("click", toggleLogoutFr);

// ----- Login Form Submission -----
const loginForm = document.getElementById("myForm") as HTMLFormElement | null;
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement)?.value;
  const password = (document.getElementById("password") as HTMLInputElement)
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
  resetForm("myFormCreateAcc");
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
  const emailInput = (document.getElementById("email2") as HTMLInputElement)
    ?.value;
  const message = document.getElementById("message2") as HTMLElement | null;
  if (!emailInput || !message) return;

  try {
    const response = await fetch("./Users_export.json");
    const users = await response.json();

    const exists = users.some((user: any) => user.email === emailInput);

    if (exists) {
      message.textContent = "Email already exists!";
      message.style.color = "black";
    } else {
      message.textContent = "Account created successfully! Please login.";
      message.style.color = "black";
    }

    createAccForm?.classList.toggle("hiddenx2");
    createAccHdr?.classList.toggle("hiddenx2");
    createAccMsg?.classList.toggle("hiddenx2");
  } catch (error) {
    console.error("Error checking email:", error);
  }
}

createAccBtn?.addEventListener("click", checkEmail);

// ----- Page Sections & Search -----
const pizzaPage = document.querySelector(".pizza") as HTMLElement | null;
const pastaPage = document.querySelector(".pasta") as HTMLElement | null;
const bigContainer = document.querySelector(".container") as HTMLElement | null;
const searchBtn = document.querySelector(".search-btn") as HTMLElement | null;

searchBtn?.addEventListener("click", (e) => {
  e.preventDefault();

  const input = (
    document.getElementById("searchInput") as HTMLInputElement
  )?.value
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
const mainPage = document.querySelector(".main") as HTMLElement | null;
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
    // window.location.href = `/searchPpage/${resNameFile}.html?restaurantName=${encodeURIComponent(
    //   restaurantName
    // )}`;
    // window.location.href = `/pjpage/${resNameFile}.html?restaurantName=${encodeURIComponent(
    //   restaurantName
    // )}`;
    window.location.href = `/faqPg/${resNameFile}.html?restaurantName=${encodeURIComponent(
      restaurantName
    )}`;
    clearInterval(redirectInterval);
  }
}, 500);
