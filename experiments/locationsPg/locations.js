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

dot1.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "15rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Iraq</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Empire Business Centre, C1, Erbil</p>
    `;
});

dot2.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "17rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Eqypt</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">7 Zahraa Al Maadi, Maadi as Sarayat Al Gharbeyah, Maadi, Cairo</p>
    `;
});

dot3.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "17rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Jordan</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Qatari Jordanian Investment & Real Estate Development Co.,Amman</p>
    `;
});

dot4.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "15rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Kuwait</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Terrace Mall, Salmiya, Salem Al Mubarak St.</p>
    `;
});

dot5.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "17rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Bahrain</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Fakhro Tower, Building 470, Road 1010, Block 410, Manama</p>
    `;
});

dot6.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "15rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Qatar</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Borooq Tower, Doha</p>
    `;
});

dot7.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "15rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">UAE</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">talabat HQ, Al Safa Street, Al Wasl, Dubai</p>
    `;
});

dot8.addEventListener("mouseover", function () {
  s2Card.classList.remove("hiddenx2");
  s2Card.style.height = "15rem";

  s2Card.innerHTML = `
    <h3 class="s2-card-h">Oman</h3>
    <div class="s2-card-b"></div>
    <p class="s2-card-p">Muscat, Oman</p>
    `;
});
