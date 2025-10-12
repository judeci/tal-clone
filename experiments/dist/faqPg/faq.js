"use strict";
document
    .querySelectorAll(".accordion-button")
    .forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.getAttribute("data-bs-target");
        if (!targetId)
            return;
        const target = document.querySelector(targetId);
        if (!target)
            return;
        const isShown = target.classList.contains("show");
        const collapse = bootstrap.Collapse.getOrCreateInstance(target);
        if (isShown) {
            collapse.hide();
        }
        else {
            collapse.show();
        }
    });
});
