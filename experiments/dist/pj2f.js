var acc = document.getElementsByClassName("PJ-accordion-btn");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
            console.log("1");
        }
        else {
            panel.style.display = "block";
            console.log("2");
        }
        if (panel.style.maxHeight) {
            panel.style.maxHeight = "";
            console.log("3");
        }
        else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            console.log("4");
        }
    });
}
// new inc code (test):
function incItem(name, price2) {
    const cartNum = document.querySelector(`.inc-item-${name}`);
    const currentCount = +(cartNum.textContent ?? "0");
    cartNum.textContent = (currentCount + 1).toString();
    const dPrice2 = document.querySelector(`.${name}-price`);
    const currentPrice = +(dPrice2.textContent ?? "0");
    dPrice2.textContent = (currentPrice + price2).toFixed(3);
    cartTopNum++;
    cartTop.textContent = cartTopNum.toString();
}
// new dec code test :
function decItem(name, price3) {
    const cartNum = document.querySelector(`.inc-item-${name}`);
    const value = +(cartNum.textContent ?? "0");
    const dPrice3 = document.querySelector(`.${name}-price`);
    if (value === 1) {
        document.querySelector(`.PJ-cart-${name}-items`).remove();
        const codeTagFixed = `${name}`;
        const variableSL = {};
        variableSL[`firstClick${codeTagFixed}`] = true;
        firstClick[`firstClick${codeTagFixed}`] = true;
        const firstKey = Object.keys(variableSL)[0];
        const firstValue = variableSL[firstKey];
        console.log(firstValue);
        if (cartTopNum === 1) {
            cartTopNum--;
            cartTop.textContent = "";
        }
        else {
            cartTopNum--;
            cartTop.textContent = cartTopNum.toString();
        }
    }
    else {
        cartNum.textContent = (value - 1).toString();
        dPrice3.textContent = (+(dPrice3.textContent ?? "0") - price3)
            .toFixed(3)
            .toString();
        cartTopNum--;
        cartTop.textContent = cartTopNum.toString();
    }
    // });
}
// cart num inc/dec
const cartBtn = document.querySelector(".cart-btn");
const cartTop = document.querySelector(".cart-num");
let cartTopNum = 0;
//////////////////////
const PJCartItems = document.querySelector(".PJ-cart-items");
const itemLTO = document.querySelector(".LTO-links");
const itemHWI = document.querySelector(".HWI-link");
const itemBBQ = document.querySelector(".BBQ-link");
const itemGRD = document.querySelector(".GRD-link");
const itemMRG = document.querySelector(".MRG-link");
const itemPPR = document.querySelector(".PPR-link");
const itemCHS = document.querySelector(".CHS-link");
const itemWDG = document.querySelector(".WDG-link");
const itemPEP = document.querySelector(".PEP-link");
const itemSUP = document.querySelector(".SUP-link");
const itemWTR = document.querySelector(".WTR-link");
const cheeseChoice = document.querySelector(".CHS-choose");
const cheese1 = document.querySelector(".CHS1");
const cheese2 = document.querySelector(".CHS2");
// FIX
const firstClick = {
    firstClickLTO: true,
    firstClickHWI: true,
    firstClickBBQ: true,
    firstClickGRD: true,
    firstClickMRG: true,
    firstClickPPR: true,
    firstClickCHS1: true,
    firstClickCHS2: true,
    firstClickWDG: true,
    firstClickPEP: true,
    firstClickSUP: true,
    firstClickWTR: true,
};
// FIX UP
function addToCart(name, price, codeTag) {
    // FIX
    const variableSL = {};
    console.log(variableSL);
    variableSL[`firstClick${codeTag}`] = firstClick[`firstClick${codeTag}`];
    console.log(firstClick[`firstClick${codeTag}`]);
    console.log(variableSL[`firstClick${codeTag}`]);
    // if (firstClick`${codeTag}`);
    if (variableSL[`firstClick${codeTag}`]) {
        // FIX UP
        console.log("this is the price thats bad:", price.toFixed(3));
        PJCartItems.innerHTML += `
                                  <div class="PJ-cart-${codeTag}-items">
                                    <p class="item-${codeTag}">${name}:</p>
                                    <div class="${codeTag}-grid">
                                        <div class="${codeTag}-numbers">
                                            <p class="inc-item-${codeTag}">1</p>
                                            <p class="${codeTag}-KD">: KD&nbsp;</p>
                                            <p class="${codeTag}-price subtotal-price">${price.toFixed(3)}</p>

                                            </div>
                                            <button class="dec-${codeTag}" onclick="decItem('${codeTag}', ${price})">-</button>
                                        <button class="inc-${codeTag}" onclick="incItem('${codeTag}', ${price})">+</button>
                                        </div>
                                        </div>
                                `;
        //   firstClick`${codeTag}` = false;  fixed here: ?
        // remove this block if bad. from here:
        const dGrid = document.querySelector(`.${codeTag}-grid`);
        dGrid.style.display = "grid";
        dGrid.style.gridTemplateColumns = "8fr 1fr 1fr";
        const dFlex = document.querySelector(`.${codeTag}-numbers`);
        dFlex.style.display = "flex";
        const dInc = document.querySelector(`.inc-${codeTag}`);
        dInc.style.cursor = "pointer";
        dInc.style.backgroundColor = "white";
        // until here.^
        // same with this:
        const dDec = document.querySelector(`.dec-${codeTag}`);
        dDec.style.cursor = "pointer";
        dDec.style.backgroundColor = "white";
        // ^
        const codeTagFixed = `${codeTag}`;
        const variableSL = {};
        variableSL[`firstClick${codeTagFixed}`] = false;
        firstClick[`firstClick${codeTagFixed}`] = false;
        const firstKey = Object.keys(variableSL)[0];
        const firstValue = variableSL[firstKey];
        console.log(firstValue);
        document.querySelector(`.PJ-cart-${codeTag}-items`).style.borderBottom = "1px solid #ea5b2f";
        cartTopNum++;
        cartTop.textContent = cartTopNum.toString();
    }
    else {
        // incItem(`${codeTag}`, `${price}`);
        const cartNumD = document.querySelector(`.inc-item-${codeTag}`);
        console.log(cartNumD);
        const cartNumDValue = +(cartNumD.textContent ?? "0");
        cartNumD.textContent = (cartNumDValue + 1).toString();
        const dPrice = document.querySelector(`.${codeTag}-price`);
        dPrice.textContent = (+(dPrice.textContent ?? "0") + price)
            .toFixed(3)
            .toString();
        cartTopNum++;
        cartTop.textContent = cartTopNum.toString();
    }
}
itemCHS.addEventListener("click", function (e) {
    e.preventDefault();
    cheeseChoice.classList.toggle("hiddenx2");
});
cheese1.addEventListener("click", function (e) {
    e.preventDefault();
    cheeseChoice.classList.toggle("hiddenx2");
});
cheese2.addEventListener("click", function (e) {
    e.preventDefault();
    cheeseChoice.classList.toggle("hiddenx2");
});
/////////////////////////////////////
// inc/dec btns:
function waitForElementAlways(selector, callback) {
    const seen = new Set();
    setInterval(function () {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
            if (!seen.has(el)) {
                seen.add(el);
                callback(el);
            }
        });
    }, 200); // checks every 200ms
}
// subtotal:
setInterval(() => {
    const allPrices = document.querySelectorAll(".subtotal-price");
    const subtotal = document.querySelector(".PJ-subtotal");
    let temp = 0;
    allPrices.forEach((el, i) => {
        temp += +(el.textContent ?? "0");
    });
    subtotal.textContent = temp.toFixed(3).toString();
}, 1000); // 1000 ms = 1 second
const urlParams = new URLSearchParams(window.location.search);
const resName = urlParams.get("restaurantName") ?? "";
// open cart tab:
cartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    // onclick="window.location.href='papajohns.html'" in code
    window.location.href = `cart.html?resName=${encodeURIComponent(resName)}`;
});
// scroll to menu when clicking category:
$(document).ready(function () {
    $("#LTO-category").click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        const $target = $("#LTO-menu");
        const offset = $target.offset();
        if (offset) {
            $("html, body").animate({
                scrollTop: offset.top,
            }, 1000);
        }
    });
});
$(document).ready(function () {
    $("#pizza-category").click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        const $target = $("#pizza-menu");
        const offset = $target.offset();
        if (offset) {
            $("html, body").animate({
                scrollTop: offset.top,
            }, 1000);
        }
    });
});
$(document).ready(function () {
    $("#appetizers-category").click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        const $target = $("#appetizers-menu");
        const offset = $target.offset();
        if (offset) {
            $("html, body").animate({
                scrollTop: offset.top,
            }, 1000);
        }
    });
});
$(document).ready(function () {
    $("#beverages-category").click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        const $target = $("#beverages-menu");
        const offset = $target.offset();
        if (offset) {
            $("html, body").animate({
                scrollTop: offset.top,
            }, 1000);
        }
    });
});
// footer stuff:
var accFooter = document.getElementsByClassName("PJ-footer-accordion");
var i;
for (i = 0; i < accFooter.length; i++) {
    accFooter[i].addEventListener("click", function () {
        this.classList.toggle("PJ-footer-active");
        var panelFooter = this.nextElementSibling;
        if (panelFooter.style.display === "block") {
            panelFooter.style.display = "none";
        }
        else {
            panelFooter.style.display = "block";
        }
        if (panelFooter.style.maxHeight) {
            panelFooter.style.maxHeight = "";
        }
        else {
            panelFooter.style.maxHeight = panelFooter.scrollHeight + "px";
        }
    });
}
export {};
