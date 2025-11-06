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
