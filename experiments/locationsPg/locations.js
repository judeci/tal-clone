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
