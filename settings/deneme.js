let theme = localStorage.getItem("theme");
window.addEventListener("storage", changeTheme);

function changeTheme(e) {
  if (e.key === "theme") {
    console.log("değişti");
    applyTheme(e.newValue);
  }
}

