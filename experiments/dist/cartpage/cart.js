"use strict";
// import { getLSemail } from "../homepage/talabat.js"; // use .js even if it's .ts when using ES modules
// const emailIMPORTED = getLSemail();
// console.log("Logged in as:", emailIMPORTED);
const params = new URLSearchParams(window.location.search);
const resName1 = params.get("resName");
console.log(resName1);
const resName2 = document.querySelector(".res-name");
resName2.textContent = resName1;
const main = document.querySelector(".main");
const grItems = document.querySelector(".grItems");
const grSR = document.querySelector(".grSR");
const grQty = document.querySelector(".grQty");
const grPrice = document.querySelector(".grPrice");
const grTotal = document.querySelector(".grTotal");
// local storage stuff:
const codeTagsArr = [
    "LTO",
    "HWI",
    "BBQ",
    "GRD",
    "MRG",
    "PPR",
    "CHS",
    "WDG",
    "PEP",
    "SUP",
    "WTR",
    "CHS1",
    "CHS2",
];
const x = localStorage.getItem("myCart");
console.log(x?.replaceAll('"', "").split("}"));
const xArr = x?.replaceAll('"', "").split("}");
let xNew;
let xNewer;
let noComma;
let noQuotes;
xArr?.forEach((element) => {
    if (element === "") {
        return;
    }
    else {
        xNew = element.replaceAll('"', "").replaceAll("{", "").replaceAll("}", "");
        for (let i = 0; i < codeTagsArr.length; i++) {
            if (xNew.includes(codeTagsArr[i])) {
                xNewer = xNew.replace(codeTagsArr[i], "");
            }
        }
        if (xNewer?.startsWith(",")) {
            noComma = xNewer.replace(",", "");
        }
        if (noComma?.startsWith(":")) {
            noQuotes = noComma.replace(":", "");
        }
        if (xNewer?.startsWith(":")) {
            noQuotes = xNewer.replace(":", "");
        }
        console.log(noQuotes);
        grItems.append(noQuotes.split(",")[0].replace("name:", ""));
        grItems.append(document.createElement("br"));
        grPrice.append((+noQuotes.split(",")[1].replace("price:", "")).toFixed(3).toString());
        grPrice.append(document.createElement("br"));
        grQty.append(noQuotes.split(",")[2].replace("quantity:", ""));
        grQty.append(document.createElement("br"));
        if (noQuotes.split(",")[2].replace("quantity:", "") === "1") {
            grTotal.append((+noQuotes.split(",")[1].replace("price:", "")).toFixed(3).toString());
            grTotal.append(document.createElement("br"));
        }
        else {
            const qtyxprice = +noQuotes.split(",")[1].replace("price:", "") *
                +noQuotes.split(",")[2].replace("quantity:", "");
            grTotal.append(qtyxprice.toFixed(3).toString());
            grTotal.append(document.createElement("br"));
        }
    }
});
