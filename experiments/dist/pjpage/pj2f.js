"use strict";
let emailFetchedPJ;
fetch("/api/email")
    .then((res) => res.json())
    .then((data) => {
    console.log("Logged in as:", data.email);
    emailFetchedPJ = data.email;
});
// Utility: Toggle accordion panel open/close
function toggleAccordion(accordionBtn, activeClass = "active") {
    accordionBtn.classList.toggle(activeClass);
    const panel = accordionBtn.nextElementSibling;
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
}
// Attach accordion toggle to a collection of elements
function initAccordions(selector, activeClass = "active") {
    const acc = document.getElementsByClassName(selector);
    for (const btn of Array.from(acc)) {
        btn.addEventListener("click", () => toggleAccordion(btn, activeClass));
    }
}
initAccordions("PJ-accordion-btn");
initAccordions("PJ-footer-accordion", "PJ-footer-active");
const CART_STORAGE_KEY = "myCart";
let cart = {};
const cartTop = document.querySelector(".cart-num");
let cartTopNum = 0;
const PJCartItems = document.querySelector(".PJ-cart-items");
// Simplify firstClick keys to just codeTag strings:
const firstClick = {
    LTO: true,
    HWI: true,
    BBQ: true,
    GRD: true,
    MRG: true,
    PPR: true,
    CHS1: true,
    CHS2: true,
    WDG: true,
    PEP: true,
    SUP: true,
    WTR: true,
};
function saveCartToLocalStorage() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
function loadCartFromLocalStorage() {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
        cart = JSON.parse(saved);
    }
}
function updateCartTopAndDisplay() {
    const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartTopNum = totalQuantity;
    cartTop.textContent = cartTopNum > 0 ? cartTopNum.toString() : "";
}
function updateCartTop(delta) {
    cartTopNum = Math.max(cartTopNum + delta, 0);
    cartTop.textContent = cartTopNum > 0 ? cartTopNum.toString() : "";
}
function addToCart(name, price, codeTag) {
    if (cart[codeTag]) {
        // Item exists, increase quantity
        cart[codeTag].quantity += 1;
        const cartNum = document.querySelector(`.inc-item-${codeTag}`);
        const priceEl = document.querySelector(`.${codeTag}-price`);
        if (cartNum && priceEl) {
            cartNum.textContent = cart[codeTag].quantity.toString();
            priceEl.textContent = (cart[codeTag].price * cart[codeTag].quantity).toFixed(3);
        }
    }
    else {
        // New item, add to cart object
        cart[codeTag] = { name, price, quantity: 1 };
        const newItemHTML = `
      <div class="PJ-cart-${codeTag}-items" style="border-bottom:1px solid #ea5b2f;">
        <p class="item-${codeTag}">${name}:</p>
        <div class="${codeTag}-grid" style="display:grid; grid-template-columns:8fr 1fr 1fr;">
          <div class="${codeTag}-numbers" style="display:flex;">
            <p class="inc-item-${codeTag}">1</p>
            <p class="${codeTag}-KD">: KD&nbsp;</p>
            <p class="${codeTag}-price subtotal-price">${price.toFixed(3)}</p>
          </div>
          <button class="dec-${codeTag}" style="cursor:pointer; background-color:white;">-</button>
          <button class="inc-${codeTag}" style="cursor:pointer; background-color:white;">+</button>
        </div>
      </div>
    `;
        PJCartItems.insertAdjacentHTML("beforeend", newItemHTML);
        const lastItem = PJCartItems.querySelector(`.PJ-cart-${codeTag}-items`);
        if (!lastItem)
            return;
        const incBtn = lastItem.querySelector(`.inc-${codeTag}`);
        const decBtn = lastItem.querySelector(`.dec-${codeTag}`);
        incBtn?.addEventListener("click", () => incItem(codeTag, price));
        decBtn?.addEventListener("click", () => decItem(codeTag, price));
    }
    firstClick[codeTag] = false;
    updateCartTopAndDisplay();
    saveCartToLocalStorage();
}
function incItem(name, price) {
    if (!cart[name])
        return;
    cart[name].quantity += 1;
    const cartNum = document.querySelector(`.inc-item-${name}`);
    const priceEl = document.querySelector(`.${name}-price`);
    if (cartNum && priceEl) {
        cartNum.textContent = cart[name].quantity.toString();
        priceEl.textContent = (cart[name].price * cart[name].quantity).toFixed(3);
    }
    updateCartTopAndDisplay();
    saveCartToLocalStorage();
}
function decItem(name, price) {
    if (!cart[name])
        return;
    if (cart[name].quantity <= 1) {
        delete cart[name];
        const itemEl = document.querySelector(`.PJ-cart-${name}-items`);
        itemEl?.remove();
        firstClick[name] = true;
    }
    else {
        cart[name].quantity -= 1;
        const cartNum = document.querySelector(`.inc-item-${name}`);
        const priceEl = document.querySelector(`.${name}-price`);
        if (cartNum && priceEl) {
            cartNum.textContent = cart[name].quantity.toString();
            priceEl.textContent = (cart[name].price * cart[name].quantity).toFixed(3);
        }
    }
    updateCartTopAndDisplay();
    saveCartToLocalStorage();
}
window.addToCart = addToCart;
window.incItem = incItem;
window.decItem = decItem;
// Cheese choices toggling
const cheeseChoice = document.querySelector(".CHS-choose");
[".CHS-link", ".CHS1", ".CHS2"].forEach((selector) => {
    const el = document.querySelector(selector);
    el?.addEventListener("click", (e) => {
        e.preventDefault();
        cheeseChoice.classList.toggle("hiddenx2");
    });
});
// Wait for new elements and run callback once
function waitForElementAlways(selector, callback) {
    const seen = new Set();
    setInterval(() => {
        document.querySelectorAll(selector).forEach((el) => {
            if (!seen.has(el)) {
                seen.add(el);
                callback(el);
            }
        });
    }, 200);
}
// Calculate subtotal every second
setInterval(() => {
    const allPrices = document.querySelectorAll(".subtotal-price");
    const subtotal = document.querySelector(".PJ-subtotal");
    const total = Array.from(allPrices).reduce((acc, el) => acc + +(el.textContent ?? "0"), 0);
    subtotal.textContent = total.toFixed(3);
}, 1000);
// Scroll helper function
function smoothScrollTo(selector, duration = 1000) {
    const target = document.querySelector(selector);
    if (!target)
        return;
    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
    });
}
// Scroll event bindings
const scrollMappings = {
    "#LTO-category": "#LTO-menu",
    "#pizza-category": "#pizza-menu",
    "#appetizers-category": "#appetizers-menu",
    "#beverages-category": "#beverages-menu",
};
Object.entries(scrollMappings).forEach(([btnSelector, menuSelector]) => {
    const btn = document.querySelector(btnSelector);
    btn?.addEventListener("click", (e) => {
        e.preventDefault();
        smoothScrollTo(menuSelector);
    });
});
// Cart button redirect
const cartBtn = document.querySelector(".cart-btn");
const urlParams = new URLSearchParams(window.location.search);
const resName = urlParams.get("restaurantName") ?? "Papa John's Pizza";
// i think should remove papa john's pizza but.. idk
cartBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = `/cartpage/cart.html?resName=${encodeURIComponent(resName)}`;
});
// Prevent cartTop default click behavior (optional)
const cartTopEl = document.querySelector(".cart-num");
cartTopEl?.addEventListener("click", (e) => e.preventDefault());
//
window.addEventListener("DOMContentLoaded", () => {
    loadCartFromLocalStorage();
    for (const codeTag in cart) {
        const { name, price, quantity } = cart[codeTag];
        firstClick[codeTag] = false;
        const newItemHTML = `
      <div class="PJ-cart-${codeTag}-items" style="border-bottom:1px solid #ea5b2f;">
        <p class="item-${codeTag}">${name}:</p>
        <div class="${codeTag}-grid" style="display:grid; grid-template-columns:8fr 1fr 1fr;">
          <div class="${codeTag}-numbers" style="display:flex;">
            <p class="inc-item-${codeTag}">${quantity}</p>
            <p class="${codeTag}-KD">: KD&nbsp;</p>
            <p class="${codeTag}-price subtotal-price">${(price * quantity).toFixed(3)}</p>
          </div>
          <button class="dec-${codeTag}" style="cursor:pointer; background-color:white;">-</button>
          <button class="inc-${codeTag}" style="cursor:pointer; background-color:white;">+</button>
        </div>
      </div>
    `;
        PJCartItems.insertAdjacentHTML("beforeend", newItemHTML);
        const lastItem = PJCartItems.querySelector(`.PJ-cart-${codeTag}-items`);
        if (!lastItem)
            continue;
        const incBtn = lastItem.querySelector(`.inc-${codeTag}`);
        const decBtn = lastItem.querySelector(`.dec-${codeTag}`);
        incBtn?.addEventListener("click", () => incItem(codeTag, price));
        decBtn?.addEventListener("click", () => decItem(codeTag, price));
    }
    updateCartTopAndDisplay();
});
