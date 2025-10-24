const registerTab = document.getElementById("registerTab");
const loginTab = document.getElementById("loginTab");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const avatar = document.querySelector("#avatar");
const fileInput = document.querySelector("#fileInput");
registerTab.addEventListener("click", () => {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
});

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
});

avatar.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      avatar.src = e.target.result;
      localStorage.setItem("image", avatar.src);
    };
    reader.readAsDataURL(file);
  }
});

function getRegisterElements() {
  const userEmail = document.getElementById("email").value;
  const userName = document.getElementById("userName").value;
  const surname = document.getElementById("surName").value;
  const password = document.getElementById("password").value;
  const isInputValid = inputInvalid(userEmail, userName, surname, password);
  if (isInputValid) {
    console.log("tüm alanlar dolu");
  } else {
    console.log("tüm alanları doldurunuz");
  }
}

function inputInvalid(email, name, surname, password) {
  const values = [email, name, surname, password];
  return values.every((val) => val && val.trim() !== "");
}
