// --- Tema ve Dil Durumu ---
const AppState = {
  theme: getCookie("theme") || "auto",
  lang: getCookie("lang") || "tr",
};

// --- Sayfa Yüklendiğinde Uygula ---
function initApp() {
  const savedTheme = getCookie("theme") || "auto";
  const savedLang = getCookie("lang") || "tr";

  AppState.theme = savedTheme;
  AppState.lang = savedLang;

  applyTheme(savedTheme);
  loadLanguage(savedLang);

  // aktif butonları güncelle
  const themeBtn = document.getElementById(`${savedTheme}-btn`);
  if (themeBtn) themeBtn.classList.add("active");

  const langBtn = document.getElementById(`${savedLang}-btn`);
  if (langBtn) langBtn.classList.add("active");
}

window.addEventListener("DOMContentLoaded", initApp);

// --- Tema Uygulama ---
function applyTheme(theme) {
  document.body.classList.remove("light", "dark");

  if (theme === "light") document.body.classList.add("light");
  else if (theme === "dark") document.body.classList.add("dark");
  else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.body.classList.add(prefersDark ? "dark" : "light");
  }
}

function setTheme(theme) {
  AppState.theme = theme;
  setCookie("theme", theme, 30);
  applyTheme(theme);

  // buton aktifliği
  document
    .querySelectorAll(".theme-buttons button")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`${theme}-btn`);
  if (activeBtn) activeBtn.classList.add("active");
}

// --- Dil Yükleme ---
async function loadLanguage(lang) {
  try {
    const response = await fetch(`/jsons/${lang}.json`);
    const data = await response.json();

    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (data[key]) el.textContent = data[key];
    });

    AppState.lang = lang;
    setCookie("lang", lang, 30);
  } catch (err) {
    console.error("Dil dosyası yüklenemedi:", err);
  }
}

// --- Dil Değiştirme ---
function setLanguage(lang) {
  loadLanguage(lang);

  document
    .querySelectorAll(".lang-buttons button")
    .forEach((btn) => btn.classList.remove("active"));
  const activeBtn = document.getElementById(`${lang}-btn`);
  if (activeBtn) activeBtn.classList.add("active");
}

// --- Cookie  ---
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

document.addEventListener("spa:page-changed", () => {
  const currentLang = getCookie("lang") || "tr";
  const currentTheme = getCookie("theme") || "auto";

  loadLanguage(currentLang);
  applyTheme(currentTheme);

  document
    .querySelectorAll(".theme-buttons button")
    .forEach((btn) => btn.classList.remove("active"));
  const themeBtn = document.getElementById(`${currentTheme}-btn`);
  if (themeBtn) themeBtn.classList.add("active");

  document
    .querySelectorAll(".lang-buttons button")
    .forEach((btn) => btn.classList.remove("active"));
  const langBtn = document.getElementById(`${currentLang}-btn`);
  if (langBtn) langBtn.classList.add("active");
});
