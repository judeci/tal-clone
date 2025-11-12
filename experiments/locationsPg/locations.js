import { resources } from "../components/translation.js";

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbarSticky").style.top = "0";
  } else {
    document.getElementById("navbarSticky").style.top = "-9rem";
  }
  prevScrollpos = currentScrollPos;
};

const vidImg = document.querySelector(".video-img");
const vid = document.querySelector(".video-main");
const playHdr = document.querySelector(".play-hdr");
const playBtn = document.querySelector(".play-btn");

vidImg.addEventListener("click", function () {
  //   vidImg.style.display = "none";
  vidImg.classList.add("hiddenx2");
  playBtn.classList.add("hiddenx2");
  playHdr.classList.add("hiddenx2");
  vid.classList.remove("hiddenx2");
});

playBtn.addEventListener("click", function () {
  //   vidImg.style.display = "none";
  vidImg.classList.add("hiddenx2");
  playBtn.classList.add("hiddenx2");
  playHdr.classList.add("hiddenx2");
  vid.classList.remove("hiddenx2");
});

playHdr.addEventListener("click", function () {
  //   vidImg.style.display = "none";
  vidImg.classList.add("hiddenx2");
  playBtn.classList.add("hiddenx2");
  playHdr.classList.add("hiddenx2");
  vid.classList.remove("hiddenx2");
});

const cardHdr = document.querySelector(".card-hdr");
const uae = document.querySelector(".uae");
const kwt = document.querySelector(".kwt");
const qtr = document.querySelector(".qtr");
const omn = document.querySelector(".omn");
const bhn = document.querySelector(".bhn");
const textHdr = document.querySelector(".text-hdr");
const country = document.querySelector(".country");
const textP = document.querySelector(".text-p");
const dot1 = document.querySelector(".dot1");
const dot2 = document.querySelector(".dot2");
const dot3 = document.querySelector(".dot3");
const dot4 = document.querySelector(".dot4");
const dot5 = document.querySelector(".dot5");
const dot6 = document.querySelector(".dot6");
const dot7 = document.querySelector(".dot7");
const dot8 = document.querySelector(".dot8");
const s2Card = document.querySelector(".section2-card");

uae.addEventListener("click", function () {
  if (uae.classList.contains("focused")) {
  } else {
    uae.classList.add("focused");
    cardHdr.innerHTML = "UAE";
    country.innerHTML = "UAE";
    textP.innerHTML = `We're thrilled to announce that talabat UAE is officially a Great Place to Work<sup>&reg;</sup> certified company for the third time in a row!
                <br><br>
                Additionally, talabat UAE has also proudly earned a spot in the Best Workplaces for Parents™ in the UAE category.`;
  }
  kwt.classList.remove("focused");
  qtr.classList.remove("focused");
  omn.classList.remove("focused");
  bhn.classList.remove("focused");
});

kwt.addEventListener("click", function () {
  if (kwt.classList.contains("focused")) {
  } else {
    kwt.classList.add("focused");
    cardHdr.innerHTML = "Kuwait";
    country.innerHTML = "Kuwait";
    textP.innerHTML = `We're thrilled to announce that talabat Kuwait is officially a Great Place to Work<sup>&reg;</sup> certified company!
                <br><br>
                Additionally, talabat Kuwait has also proudly earned a spot in the Best Workplaces in Kuwait™.`;
  }
  uae.classList.remove("focused");
  qtr.classList.remove("focused");
  omn.classList.remove("focused");
  bhn.classList.remove("focused");
});

qtr.addEventListener("click", function () {
  if (qtr.classList.contains("focused")) {
  } else {
    qtr.classList.add("focused");
    cardHdr.innerHTML = "Qatar";
    country.innerHTML = "Qatar";
    textP.innerHTML = `We're thrilled to announce that talabat is officially recognized as a Great Place to Work<sup>&reg;</sup> in Qatar for the third year running!`;
  }
  kwt.classList.remove("focused");
  uae.classList.remove("focused");
  omn.classList.remove("focused");
  bhn.classList.remove("focused");
});

omn.addEventListener("click", function () {
  if (omn.classList.contains("focused")) {
  } else {
    omn.classList.add("focused");
    cardHdr.innerHTML = "Oman";
    country.innerHTML = "Oman";
    textP.innerHTML = `We're thrilled to announce that talabat is officially a Great Place to Work<sup>&reg;</sup> in Oman!`;
  }
  kwt.classList.remove("focused");
  qtr.classList.remove("focused");
  uae.classList.remove("focused");
  bhn.classList.remove("focused");
});

bhn.addEventListener("click", function () {
  if (bhn.classList.contains("focused")) {
  } else {
    bhn.classList.add("focused");
    cardHdr.innerHTML = "Bahrain";
    country.innerHTML = "Bahrain";
    textP.innerHTML = `We're thrilled to announce that talabat is officially recognized as a Great Place to Work<sup>&reg;</sup> in Bahrain!
                <br><br>
                Additionally, talabat has also proudly earned a spot in the top 5 Best Workplaces™ in Bahrain for 2023.`;
  }
  kwt.classList.remove("focused");
  qtr.classList.remove("focused");
  omn.classList.remove("focused");
  uae.classList.remove("focused");
});

const dotFn = function (x) {
  s2Card.classList.remove("hiddenx2");
  if ((x === "egy" || x === "jdn" || x === "bhn") && currentLang === "en") {
    s2Card.style.height = "17rem";
  } else {
    s2Card.style.height = "15rem";
  }

  s2Card.innerHTML = `
    <h3 class="s2-card-h" data-i18n=${x}>${resources[currentLang][x]}</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p" data-i18n=${x + "T"}>${
    resources[currentLang][x + "T"]
  }</p>
    `;
};

let xGL = "";

const dotElements = document.querySelectorAll(".dot");
dotElements.forEach((el) => {
  el.addEventListener("mouseover", function () {
    if (el.classList.contains("dot1")) {
      dotFn("irq");
    } else if (el.classList.contains("dot2")) {
      dotFn("egy");
      xGL = "egy";
    } else if (el.classList.contains("dot3")) {
      dotFn("jdn");
      xGL = "jdn";
    } else if (el.classList.contains("dot4")) {
      dotFn("kwt");
    } else if (el.classList.contains("dot5")) {
      dotFn("bhn");
      xGL = "bhn";
    } else if (el.classList.contains("dot6")) {
      dotFn("qtr");
    } else if (el.classList.contains("dot7")) {
      dotFn("uae");
    } else {
      dotFn("omn");
    }
  });
});

const langBtn = document.querySelector(".lng-btn");
const body = document.body;
let currentLang = "en";

langBtn.addEventListener("click", function () {
  if (currentLang === "ar") {
    body.style.textAlign = "left";
    body.style.direction = "ltr";
    if (xGL === "egy" || xGL === "jdn" || xGL === "bhn") {
      s2Card.style.height = "17rem";
    }
    currentLang = "en";
  } else if (currentLang === "en") {
    body.style.textAlign = "right";
    body.style.direction = "rtl";
    s2Card.style.height = "15rem";
    currentLang = "ar";
  }
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (resources[currentLang][key]) {
      el.textContent = resources[currentLang][key];
    }
  });
});

// dot1.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "15rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="irq">${resources[currentLang].irq}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="irqT">${resources[currentLang].irqT}</p>
//     `;
// });

// dot2.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "17rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="egy">${resources[currentLang].egy}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="egyT">${resources[currentLang].egyT}</p>
//     `;
// });

// dot3.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "17rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="jdn">${resources[currentLang].jdn}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="jdnT">${resources[currentLang].jdnT}</p>
//     `;
// });

// dot4.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "15rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="kwt">${resources[currentLang].kwt}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="kwtT">${resources[currentLang].kwtT}</p>
//     `;
// });

// dot5.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "17rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="bhn">${resources[currentLang].bhn}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="bhnT">${resources[currentLang].bhnT}</p>
//     `;
// });

// dot6.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "15rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="qtr">${resources[currentLang].qtr}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="qtrT">${resources[currentLang].qtrT}</p>
//     `;
// });

// dot7.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "15rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="uae">${resources[currentLang].uae}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="uaeT">${resources[currentLang].uaeT}</p>
//     `;
// });

// dot8.addEventListener("mouseover", function () {
//   s2Card.classList.remove("hiddenx2");
//   s2Card.style.height = "15rem";

//   s2Card.innerHTML = `
//     <h3 class="s2-card-h" data-i18n="omn">${resources[currentLang].omn}</h3>
//     <div class="s2-card-b"></div>
//     <p class="s2-card-p" data-i18n="omnT">${resources[currentLang].omnT}</p>
//     `;
// });
