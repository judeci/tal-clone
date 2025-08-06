const params = new URLSearchParams(window.location.search);
const resName1 = params.get("resName");
console.log(resName1);

const resName2 = document.querySelector(".res-name") as HTMLElement;
resName2.textContent = resName1;

const main = document.querySelector(".main") as HTMLElement;
