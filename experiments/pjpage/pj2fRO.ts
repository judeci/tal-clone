// // ----- Fetch Logged-in Email -----
// let emailFetchedPJ = "";
// fetch("/api/email")
//   .then((res) => res.json())
//   .then((data) => (emailFetchedPJ = data.email));

// // ----- Tabs Logic -----
// const tabs = [
//   document.querySelector(".t1") as HTMLElement,
//   document.querySelector(".t2") as HTMLElement,
//   document.querySelector(".t3") as HTMLElement,
// ];

// function setActiveTab(index: number) {
//   tabs.forEach((tab, i) => {
//     tab.style.fontSize = i === index ? "1.84rem" : "1.8rem";
//     tab.style.borderBottom = i === index ? "3px solid #ea5b2f" : "none";
//   });
// }
// setActiveTab(0);

// // @ts-ignore
// window.PJtabClick = (num: number) => setActiveTab(num - 1);

// // ----- Accordion -----
// function toggleAccordion(btn: HTMLElement, activeClass = "active") {
//   btn.classList.toggle(activeClass);
//   const panel = btn.nextElementSibling as HTMLElement;
//   if (panel) {
//     const isOpen = panel.style.display === "block";
//     panel.style.display = isOpen ? "none" : "block";
//     panel.style.maxHeight = isOpen ? "" : `${panel.scrollHeight}px`;
//   }
// }

// function initAccordions(selector: string, activeClass = "active") {
//   document
//     .querySelectorAll<HTMLElement>(`.${selector}`)
//     .forEach((btn) =>
//       btn.addEventListener("click", () => toggleAccordion(btn, activeClass))
//     );
// }

// // ----- Menu Item Insertion -----
// const PJCartItems = document.querySelector(".PJ-cart-items") as HTMLElement;

// function addMenuItems(
//   id: string,
//   category: string,
//   item: string,
//   price: number,
//   tag: string,
//   imgSrc: string,
//   desc: string
// ) {
//   const idPanel = document.querySelector(`.${id}-panel`);
//   if (!idPanel) return;

//   const html = `
//     <a href="javascript:void(0)" class="${id}-links grid-panel" onclick="addToCart('${item}', ${price}, '${tag}')">
//       <img class="panel-img" src="${imgSrc}" />
//       <div class="item-flex">
//         <p>${item}</p>
//         <p class="item-desc">${desc}</p>
//       </div>
//       <p class="panel-price">KD ${price.toFixed(3)}</p>
//       <p>+</p>
//     </a>
//   `;
//   idPanel.insertAdjacentHTML("beforeend", html);
// }

// fetch("./pjItems.json")
//   .then((res) => res.json())
//   .then((menuItems) => {
//     menuItems.forEach((item: any) =>
//       addMenuItems(
//         item.id,
//         item.category,
//         item.item,
//         item.price,
//         item.tag,
//         item.img,
//         item.description
//       )
//     );
//   })
//   .then(() => {
//     initAccordions("PJ-accordion-btn");
//   })
//   .catch((err) => console.error("Failed to load menu:", err));

// initAccordions("PJ-footer-accordion", "PJ-footer-active");

// // ----- Cart Logic -----
// interface CartItem {
//   name: string;
//   price: number;
//   quantity: number;
// }

// const CART_KEY = "myCart";
// let cart: Record<string, CartItem> = {};

// const cartTop = document.querySelector(".cart-num") as HTMLElement;
// const PJsubTotDiv = document.querySelector(".PJ-subtotal-div") as HTMLElement;
// const PJempty = document.querySelector(".empty-cart") as HTMLElement;
// let cartTopNum = 0;

// function saveCart() {
//   localStorage.setItem(CART_KEY, JSON.stringify(cart));
// }

// function loadCart() {
//   const saved = localStorage.getItem(CART_KEY);
//   if (saved) cart = JSON.parse(saved);
// }

// function updateCartTopAndDisplay() {
//   cartTopNum = Object.values(cart).reduce(
//     (sum, item) => sum + item.quantity,
//     0
//   );
//   cartTop.textContent = cartTopNum > 0 ? `${cartTopNum}` : "";
//   PJsubTotDiv.classList.toggle("hiddenx2", cartTopNum === 0);
//   PJempty.classList.toggle("hiddenx2", cartTopNum > 0);
// }

// function subT() {
//   const prices = document.querySelectorAll(".subtotal-price");
//   const subtotal = Array.from(prices).reduce(
//     (acc, el) => acc + parseFloat(el.textContent ?? "0"),
//     0
//   );
//   const subtotalEl = document.querySelector(".PJ-subtotal") as HTMLElement;
//   subtotalEl.textContent = subtotal.toFixed(3);
// }

// function createCartItemHTML(
//   name: string,
//   price: number,
//   codeTag: string,
//   quantity: number
// ) {
//   return `
//     <div class="PJ-cart-${codeTag}-items" style="border-bottom:1px solid #ea5b2f;">
//       <p class="item-${codeTag}">${name}:</p>
//       <div class="${codeTag}-grid" style="display:grid; grid-template-columns:8fr 1fr 1fr;">
//         <div class="${codeTag}-numbers" style="display:flex;">
//           <p class="inc-item-${codeTag}">${quantity}</p>
//           <p class="${codeTag}-KD">: KD&nbsp;</p>
//           <p class="${codeTag}-price subtotal-price">${(
//     price * quantity
//   ).toFixed(3)}</p>
//         </div>
//         <button class="dec-${codeTag}" style="cursor:pointer; background-color:white;">-</button>
//         <button class="inc-${codeTag}" style="cursor:pointer; background-color:white;">+</button>
//       </div>
//     </div>
//   `;
// }

// function attachCartItemEvents(codeTag: string, price: number) {
//   const itemEl = PJCartItems.querySelector(`.PJ-cart-${codeTag}-items`);
//   if (!itemEl) return;

//   itemEl
//     .querySelector(`.inc-${codeTag}`)
//     ?.addEventListener("click", () => incItem(codeTag, price));
//   itemEl
//     .querySelector(`.dec-${codeTag}`)
//     ?.addEventListener("click", () => decItem(codeTag, price));
// }

// function addToCart(name: string, price: number, codeTag: string) {
//   const item = cart[codeTag];

//   if (item) {
//     item.quantity += 1;
//   } else {
//     cart[codeTag] = { name, price, quantity: 1 };
//     PJCartItems.insertAdjacentHTML(
//       "beforeend",
//       createCartItemHTML(name, price, codeTag, 1)
//     );
//     attachCartItemEvents(codeTag, price);
//   }

//   updateItemDisplay(codeTag);
//   updateCartTopAndDisplay();
//   subT();
//   saveCart();
// }

// function updateItemDisplay(codeTag: string) {
//   const item = cart[codeTag];
//   const countEl = document.querySelector(`.inc-item-${codeTag}`) as HTMLElement;
//   const priceEl = document.querySelector(`.${codeTag}-price`) as HTMLElement;
//   if (countEl && priceEl && item) {
//     countEl.textContent = `${item.quantity}`;
//     priceEl.textContent = (item.quantity * item.price).toFixed(3);
//   }
// }

// function incItem(codeTag: string, price: number) {
//   if (!cart[codeTag]) return;
//   cart[codeTag].quantity += 1;
//   updateItemDisplay(codeTag);
//   updateCartTopAndDisplay();
//   subT();
//   saveCart();
// }

// function decItem(codeTag: string, price: number) {
//   if (!cart[codeTag]) return;

//   if (cart[codeTag].quantity <= 1) {
//     delete cart[codeTag];
//     document.querySelector(`.PJ-cart-${codeTag}-items`)?.remove();
//   } else {
//     cart[codeTag].quantity -= 1;
//     updateItemDisplay(codeTag);
//   }

//   updateCartTopAndDisplay();
//   subT();
//   saveCart();
// }

// (window as any).addToCart = addToCart;
// (window as any).incItem = incItem;
// (window as any).decItem = decItem;

// // ----- Cheese Choice Toggle -----
// const cheeseChoice = document.querySelector(".CHS-choose") as HTMLElement;
// [".CHS-link", ".CHS1", ".CHS2"].forEach((sel) => {
//   document.querySelector(sel)?.addEventListener("click", (e) => {
//     e.preventDefault();
//     cheeseChoice.classList.toggle("hiddenx2");
//   });
// });

// // ----- Scroll to Sections -----
// const scrollMappings: Record<string, string> = {
//   "#LTO-category": "#LTO-menu",
//   "#pizza-category": "#pizza-menu",
//   "#appetizers-category": "#appetizers-menu",
//   "#beverages-category": "#beverages-menu",
// };

// function smoothScrollTo(selector: string) {
//   const target = document.querySelector(selector);
//   if (target) {
//     window.scrollTo({
//       top: target.getBoundingClientRect().top + window.scrollY,
//       behavior: "smooth",
//     });
//   }
// }

// Object.entries(scrollMappings).forEach(([trigger, target]) => {
//   document.querySelector(trigger)?.addEventListener("click", (e) => {
//     e.preventDefault();
//     smoothScrollTo(target);
//   });
// });

// // ----- Cart Page Redirect -----
// const cartBtn = document.querySelector(".cart-btn") as HTMLButtonElement;
// const resName =
//   new URLSearchParams(window.location.search).get("restaurantName") ?? "";
// cartBtn?.addEventListener("click", (e) => {
//   e.preventDefault();
//   window.location.href = `/cartpage/cart.html?resName=${encodeURIComponent(
//     resName
//   )}`;
// });

// document
//   .querySelector(".cart-num")
//   ?.addEventListener("click", (e) => e.preventDefault());

// // ----- Load Cart from Storage on DOM Ready -----
// window.addEventListener("DOMContentLoaded", () => {
//   loadCart();
//   for (const [codeTag, { name, price, quantity }] of Object.entries(cart)) {
//     PJCartItems.insertAdjacentHTML(
//       "beforeend",
//       createCartItemHTML(name, price, codeTag, quantity)
//     );
//     attachCartItemEvents(codeTag, price);
//   }
//   updateCartTopAndDisplay();
//   subT();
// });
