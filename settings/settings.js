const lightTheme = document.getElementById("light-btn");
const darkTheme = document.getElementById("dark-btn");
const autoTheme = document.getElementById("auto-btn");

const selectedTheme = getCookie("theme");

window.addEventListener("DOMContentLoaded", () => {
  applyTheme(selectedTheme || "auto");
});

lightTheme.addEventListener("click", () => {
  setCookie("theme", "light", 14);
  applyTheme("light");
});

darkTheme.addEventListener("click", () => {
  setCookie("theme", "dark", 14);
  applyTheme("dark");
});

autoTheme.addEventListener("click", () => {
  setCookie("theme", "auto", 14);
  applyTheme("auto");
});
