"use strict";
let emailFetchedPJ;
fetch("/api/email")
    .then((res) => res.json())
    .then((data) => {
    // console.log("Logged in as:", data.email);
    emailFetchedPJ = data.email;
});
const PJTab1 = document.querySelector(".t1");
const PJTab2 = document.querySelector(".t2");
const PJTab3 = document.querySelector(".t3");
const PJtab1 = function () {
    PJTab1.style.fontSize = "1.84rem";
    PJTab1.style.borderBottom = "3px solid #ea5b2f";
    PJTab1.style.borderWidth = "100%";
};
PJtab1();
// @ts-ignore
window.PJtabClick = function (num) {
    if (num === 1) {
        PJTab1.style.fontSize = "1.84rem";
        PJTab1.style.borderBottom = "3px solid #ea5b2f";
        PJTab1.style.borderWidth = "100%";
        PJTab2.style.fontSize = "1.8rem";
        PJTab2.style.borderBottom = "none";
        PJTab3.style.fontSize = "1.8rem";
        PJTab3.style.borderBottom = "none";
        console.log("111111111");
    }
    else if (num === 2) {
        PJTab2.style.fontSize = "1.84rem";
        PJTab2.style.borderBottom = "3px solid #ea5b2f";
        PJTab2.style.borderWidth = "100%";
        PJTab1.style.fontSize = "1.8rem";
        PJTab1.style.borderBottom = "none";
        PJTab3.style.fontSize = "1.8rem";
        PJTab3.style.borderBottom = "none";
    }
    else {
        PJTab3.style.fontSize = "1.84rem";
        PJTab3.style.borderBottom = "3px solid #ea5b2f";
        PJTab3.style.borderWidth = "100%";
        PJTab2.style.fontSize = "1.8rem";
        PJTab2.style.borderBottom = "none";
        PJTab1.style.fontSize = "1.8rem";
        PJTab1.style.borderBottom = "none";
    }
};
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
// document.addEventListener("DOMContentLoaded", () => {
const menuItemsDiv = document.querySelector(".menu-items");
function addMenuItems(id, category, item, price, tag, imgSrc, desc) {
    const idPanel = document.querySelector(`.${id}-panel`);
    console.log(idPanel);
    const itemHTML = `
    <a href="javascript:void(0)" class="${id}-links grid-panel" onclick="addToCart('${item}', ${price}, '${tag}')">
      <img class="panel-img" src="${imgSrc}" />
      <div class="item-flex">
      <p>${item}</p>
      <p class="item-desc">${desc}</p>
      </div>
      <p class="panel-price">KD ${price.toFixed(3)}</p>
      <p>+</p>
    </a>
  `;
    if (idPanel) {
        idPanel.insertAdjacentHTML("beforeend", itemHTML);
        // } else {
        //   menuItemsDiv.insertAdjacentHTML(
        //     "beforeend",
        //     `
        //     <button class="PJ-accordion-btn" id="${id}-menu">
        //       ${category}
        //     </button>
        //     <div class="panel">
        //       ${itemHTML}
        //     </div>
        //   `
        //   );
        // }
    }
}
fetch("./pjItems.json")
    .then((res) => res.json())
    .then((menuItemsJson) => {
    for (const item of menuItemsJson) {
        addMenuItems(item.id, item.category, item.item, item.price, item.tag, item.img, item.description);
    }
})
    .then(() => {
    const PJaccBtns = document.querySelectorAll(".PJ-accordion-btn");
    PJaccBtns.forEach((btn) => toggleAccordion(btn));
    initAccordions("PJ-accordion-btn");
    console.log("acc btns shud b working.");
})
    .catch((err) => console.error("Failed to load JSON:", err));
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
const PJsubTotDiv = document.querySelector(".PJ-subtotal-div");
const PJempty = document.querySelector(".empty-cart");
function updateCartTopAndDisplay() {
    const totalQuantity = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    cartTopNum = totalQuantity;
    cartTop.textContent = cartTopNum > 0 ? cartTopNum.toString() : "";
    if (cartTopNum > 0) {
        // remove hiddenx2 from subtotal and add it to div-cart thing
        PJsubTotDiv.classList.remove("hiddenx2");
        PJempty.classList.add("hiddenx2");
    }
    if (cartTopNum === 0) {
        PJsubTotDiv.classList.add("hiddenx2");
        PJempty.classList.remove("hiddenx2");
    }
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
        subT();
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
        subT();
    }
    firstClick[codeTag] = false;
    updateCartTopAndDisplay();
    saveCartToLocalStorage();
    subT();
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
    subT();
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
    subT();
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
// setInterval(() => {
const subT = function () {
    const allPrices = document.querySelectorAll(".subtotal-price");
    const subtotal = document.querySelector(".PJ-subtotal");
    const total = Array.from(allPrices).reduce((acc, el) => acc + +(el.textContent ?? "0"), 0);
    subtotal.textContent = total.toFixed(3);
};
// }, 0);
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
