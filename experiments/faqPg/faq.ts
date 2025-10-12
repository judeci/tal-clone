// Declare the global bootstrap variable if you're using the Bootstrap JS via CDN
declare const bootstrap: {
  Collapse: {
    getOrCreateInstance: (element: Element) => {
      hide: () => void;
      show: () => void;
    };
  };
};

document
  .querySelectorAll<HTMLButtonElement>(".accordion-button")
  .forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-bs-target");
      if (!targetId) return;

      const target = document.querySelector<HTMLElement>(targetId);
      if (!target) return;

      const isShown = target.classList.contains("show");
      const collapse = bootstrap.Collapse.getOrCreateInstance(target);

      if (isShown) {
        collapse.hide();
      } else {
        collapse.show();
      }
    });
  });
