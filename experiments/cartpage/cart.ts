import { URLSearchParams } from "url";

const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
const resName1 = urlParams.get("resName");

const resName2 = document.querySelector(".res-name") as HTMLElement;
resName2.textContent = resName1;
