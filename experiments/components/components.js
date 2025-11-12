async function loadComponent(element, file) {
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Failed to load ${file}`);
    const html = await response.text();
    element.innerHTML = html;
  } catch (err) {
    console.error("❌ Error loading component:", err);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach((el) => {
    loadComponent(el, el.getAttribute("data-include"));
  });
});
