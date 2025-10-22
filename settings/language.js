async function loadLanguage(lang) {
  try {
    const response = await fetch(`${lang}.json`);
    const data = await response.json();

    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (data[key]) {
        el.textContent = data[key];
      }
    });
  } catch (err) {
    console.error("Dil dosyası yüklenemedi:", err);
  }
}

function setLang(button) {
  const lang = button.id;
  /* localStorage.setItem("lang", lang); */
  setCookie("lang", lang, 14);
  loadLanguage(lang);
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = getCookie("lang") || "tr";
  loadLanguage(savedLang);
});
