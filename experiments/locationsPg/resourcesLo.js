// const resources = {
//   en: {
//     map: "From Local Roots to Global Impact: Our Network of Offices Around the World.",
//     bhn: "Bahrain",
//     bhnT: "Fakhro Tower, Building 470, Road 1010, Block 410, Manama",
//     uae: "UAE",
//     uaeT: "talabat HQ, Al Safa Street, Al Wasl, Dubai",
//     omn: "Oman",
//     omnT: "Muscat, Oman",
//     qtr: "Qatar",
//     qtrT: "Borooq Tower, Doha",
//     kwt: "Kuwait",
//     kwtT: "Terrace Mall, Salmiya, Salem Al Mubarak St.",
//     irq: "Iraq",
//     irqT: "Empire Business Centre, C1, Erbil",
//     jdn: "Jordan",
//     jdnT: "Qatari Jordanian Investment & Real Estate Development Co.,Amman",
//     egy: "Egypt",
//     egyT: "7 Zahraa Al Maadi, Maadi as Sarayat Al Gharbeyah, Maadi, Cairo",
//     lang: "AR",
//   },
//   ar: {
//     map: "من الجذور المحلية إلى التأثير العالمي: شبكتنا من المكاتب حول العالم.",
//     bhn: "البحرين",
//     bhnT: "برج فخرو، مبنى 470، شارع 1010، قطعة 410، المنامة",
//     uae: "الإمارات العربية المتحدة",
//     uaeT: "المقر الرئيسي لطلبات، شارع الصفا، الوصل، دبي",
//     omn: "عمان",
//     omnT: "مسقط، عمان",
//     qtr: "قطر",
//     qtrT: "برج بروق، الدوحة",
//     kwt: "الكويت",
//     kwtT: "تيراس مول، السالمية، شارع سالم المبارك",
//     irq: "عراق",
//     irqT: "مركز إمباير للأعمال، C1، أربيل",
//     jdn: "الاردن",
//     jdnT: "شركة الاستثمار والتطوير العقاري القطرية الأردنية، عمّان",
//     egy: "مصر",
//     egyT: "7 زهرا المعادي، المعادي الصرايات الغربية، المعادي، القاهرة",
//     lang: "EN",
//   },
// };

// const langBtn = document.querySelector(".lng-btn");
// const body = document.body;
// let currentLang = "ar";

// langBtn.addEventListener("click", function () {
//   body.style.textAlign = "right";
//   body.style.direction = "rtl";

//   const elements = document.querySelectorAll("[data-i18n]");
//   elements.forEach((el) => {
//     const key = el.getAttribute("data-i18n");
//     if (resources[currentLang][key]) {
//       el.textContent = resources[currentLang][key];
//     }
//   });
// });
