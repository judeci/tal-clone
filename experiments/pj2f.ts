import { off } from "process";

var acc = document.getElementsByClassName(
  "PJ-accordion-btn"
) as HTMLCollectionOf<HTMLElement>;
var i: number;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");

    var panel = this.nextElementSibling as HTMLElement;
    if (panel.style.display === "block") {
      panel.style.display = "none";
      console.log("1");
    } else {
      panel.style.display = "block";
      console.log("2");
    }

    if (panel.style.maxHeight) {
      panel.style.maxHeight = "";
      console.log("3");
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      console.log("4");
    }
  });
}

// new inc code (test):
function incItem(name: string, price2: number) {
  const cartNum = document.querySelector(`.inc-item-${name}`) as HTMLElement;
  const currentCount = +(cartNum.textContent ?? "0");
  cartNum.textContent = (currentCount + 1).toString();

  const dPrice2 = document.querySelector(`.${name}-price`) as HTMLElement;
  const currentPrice = +(dPrice2.textContent ?? "0");
  dPrice2.textContent = (currentPrice + price2).toFixed(3);

  cartTopNum++;
  cartTop.textContent = cartTopNum.toString();
}

// new dec code test :
function decItem(name: string, price3: number) {
  const cartNum = document.querySelector(`.inc-item-${name}`) as HTMLElement;
  const value = +(cartNum.textContent ?? "0");
  const dPrice3 = document.querySelector(`.${name}-price`) as HTMLElement;
  if (value === 1) {
    (document.querySelector(`.PJ-cart-${name}-items`) as HTMLElement).remove();

    const codeTagFixed: string = `${name}`;
    const variableSL: Record<string, boolean> = {};
    variableSL[`firstClick${codeTagFixed}`] = true;
    firstClick[`firstClick${codeTagFixed}`] = true;
    const firstKey = Object.keys(variableSL)[0];
    const firstValue = variableSL[firstKey];
    console.log(firstValue);

    if (cartTopNum === 1) {
      cartTopNum--;
      cartTop.textContent = "";
    } else {
      cartTopNum--;
      cartTop.textContent = cartTopNum.toString();
    }
  } else {
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

const cartBtn = document.querySelector(".cart-btn") as HTMLButtonElement;

const cartTop = document.querySelector(".cart-num") as HTMLElement;
let cartTopNum: number = 0;

//////////////////////

const PJCartItems = document.querySelector(".PJ-cart-items") as HTMLElement;

const itemLTO = document.querySelector(".LTO-links") as HTMLElement;

const itemHWI = document.querySelector(".HWI-link") as HTMLElement;

const itemBBQ = document.querySelector(".BBQ-link") as HTMLElement;

const itemGRD = document.querySelector(".GRD-link") as HTMLElement;

const itemMRG = document.querySelector(".MRG-link") as HTMLElement;

const itemPPR = document.querySelector(".PPR-link") as HTMLElement;

const itemCHS = document.querySelector(".CHS-link") as HTMLElement;

const itemWDG = document.querySelector(".WDG-link") as HTMLElement;

const itemPEP = document.querySelector(".PEP-link") as HTMLElement;

const itemSUP = document.querySelector(".SUP-link") as HTMLElement;

const itemWTR = document.querySelector(".WTR-link") as HTMLElement;

const cheeseChoice = document.querySelector(".CHS-choose") as HTMLElement;
const cheese1 = document.querySelector(".CHS1") as HTMLElement;
const cheese2 = document.querySelector(".CHS2") as HTMLElement;

// FIX
const firstClick: Record<string, boolean> = {
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

function addToCart(name: string, price: number, codeTag: string) {
  // FIX
  const variableSL: Record<string, boolean> = {};
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
                                            <p class="${codeTag}-price subtotal-price">${price.toFixed(
      3
    )}</p>

                                            </div>
                                            <button class="dec-${codeTag}" onclick="decItem('${codeTag}', ${price})">-</button>
                                        <button class="inc-${codeTag}" onclick="incItem('${codeTag}', ${price})">+</button>
                                        </div>
                                        </div>
                                `;

    //   firstClick`${codeTag}` = false;  fixed here: ?

    // remove this block if bad. from here:
    const dGrid = document.querySelector(`.${codeTag}-grid`) as HTMLElement;
    dGrid.style.display = "grid";
    dGrid.style.gridTemplateColumns = "8fr 1fr 1fr";

    const dFlex = document.querySelector(`.${codeTag}-numbers`) as HTMLElement;
    dFlex.style.display = "flex";

    const dInc = document.querySelector(`.inc-${codeTag}`) as HTMLElement;
    dInc.style.cursor = "pointer";
    dInc.style.backgroundColor = "white";
    // until here.^

    // same with this:
    const dDec = document.querySelector(`.dec-${codeTag}`) as HTMLElement;
    dDec.style.cursor = "pointer";
    dDec.style.backgroundColor = "white";
    // ^

    const codeTagFixed: string = `${codeTag}`;
    const variableSL: Record<string, boolean> = {};
    variableSL[`firstClick${codeTagFixed}`] = false;
    firstClick[`firstClick${codeTagFixed}`] = false;
    const firstKey = Object.keys(variableSL)[0];
    const firstValue = variableSL[firstKey];
    console.log(firstValue);

    (
      document.querySelector(`.PJ-cart-${codeTag}-items`) as HTMLElement
    ).style.borderBottom = "1px solid #ea5b2f";

    cartTopNum++;
    cartTop.textContent = cartTopNum.toString();
  } else {
    // incItem(`${codeTag}`, `${price}`);
    const cartNumD = document.querySelector(
      `.inc-item-${codeTag}`
    ) as HTMLElement;
    console.log(cartNumD);
    const cartNumDValue: number = +(cartNumD.textContent ?? "0");
    cartNumD.textContent = (cartNumDValue + 1).toString();

    const dPrice = document.querySelector(`.${codeTag}-price`) as HTMLElement;
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
function waitForElementAlways(
  selector: string,
  callback: (el: Element) => void
): void {
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
  const allPrices = document.querySelectorAll(
    ".subtotal-price"
  ) as NodeListOf<HTMLElement>;
  const subtotal = document.querySelector(".PJ-subtotal") as HTMLElement;
  let temp: number = 0;
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
  $("#LTO-category").click(function (e: any) {
    e.preventDefault(); // Prevent default link behavior

    const $target = $("#LTO-menu");
    const offset = $target.offset();

    if (offset) {
      $("html, body").animate(
        {
          scrollTop: offset.top,
        },
        1000
      );
    }
  });
});

$(document).ready(function () {
  $("#pizza-category").click(function (e) {
    e.preventDefault(); // Prevent default link behavior

    const $target = $("#pizza-menu");
    const offset = $target.offset();

    if (offset) {
      $("html, body").animate(
        {
          scrollTop: offset.top,
        },
        1000
      );
    }
  });
});

$(document).ready(function () {
  $("#appetizers-category").click(function (e) {
    e.preventDefault(); // Prevent default link behavior

    const $target = $("#appetizers-menu");
    const offset = $target.offset();

    if (offset) {
      $("html, body").animate(
        {
          scrollTop: offset.top,
        },
        1000
      );
    }
  });
});

$(document).ready(function () {
  $("#beverages-category").click(function (e) {
    e.preventDefault(); // Prevent default link behavior

    const $target = $("#beverages-menu");
    const offset = $target.offset();

    if (offset) {
      $("html, body").animate(
        {
          scrollTop: offset.top,
        },
        1000
      );
    }
  });
});

// footer stuff:

var accFooter = document.getElementsByClassName(
  "PJ-footer-accordion"
) as HTMLCollectionOf<HTMLElement>;
var i: number;

for (i = 0; i < accFooter.length; i++) {
  accFooter[i].addEventListener("click", function () {
    this.classList.toggle("PJ-footer-active");

    var panelFooter = this.nextElementSibling as HTMLElement;
    if (panelFooter.style.display === "block") {
      panelFooter.style.display = "none";
    } else {
      panelFooter.style.display = "block";
    }

    if (panelFooter.style.maxHeight) {
      panelFooter.style.maxHeight = "";
    } else {
      panelFooter.style.maxHeight = panelFooter.scrollHeight + "px";
    }
  });
}
