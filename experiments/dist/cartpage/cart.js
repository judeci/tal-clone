import { URLSearchParams } from "url";
const urlParams = new URLSearchParams(window.location.search);
const resName1 = urlParams.get("resName");
const resName2 = document.querySelector(".res-name");
resName2.textContent = resName1;
