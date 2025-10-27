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

function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  localStorage.setItem(name, value);
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function applyTheme(theme) {
  document.body.classList.remove("light", "dark", "auto");

  if (theme === "light") {
    document.body.classList.add("light");
  } else if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
  }
}

