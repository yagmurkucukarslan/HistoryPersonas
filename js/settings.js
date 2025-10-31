/* // settings.js
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = getCookie("theme") || "auto";
  const themeBtn = document.getElementById(`${savedTheme}-btn`);
  if (themeBtn) themeBtn.classList.add("active");

  const savedLang = getCookie("lang") || "tr";
  const langBtn = document.getElementById(`${savedLang}-btn`);
  if (langBtn) langBtn.classList.add("active");
});
 */