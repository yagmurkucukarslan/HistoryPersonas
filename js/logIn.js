(() => {
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
        /* localStorage.setItem("image", avatar.src); */
        profileUrl(avatar.src);
      };
      reader.readAsDataURL(file);
    }
  });

  /* ---------------------------------------------------------------------------------- */

  function uniqueIdGenerator() {
    const random = Math.floor(Math.random() * 10000) + 1000;
    console.log(random);

    return uniqueIdChecker(random);
  }

  function uniqueIdChecker(uniqueId) {
    let users = getLocalstorage("users");

    const userIdCheck = users.find((user) => user.id == uniqueId);
    console.log(userIdCheck);

    if (userIdCheck) {
      uniqueIdGenerator();
    } else {
      return uniqueId;
    }
  }

  function inputInvalid(email, name, surname, password) {
    const values = [email, name, surname, password];
    return values.every((val) => val && val.trim() !== "");
  }

  function registerUser() {
    const emailInputVal = document.getElementById("email").value;
    const usernameInputVal = document.getElementById("userName").value;
    const surnameInputVal = document.getElementById("surName").value;
    const passwordInputVal = document.getElementById("password").value;
    if (
      emailInputVal &&
      usernameInputVal &&
      surnameInputVal &&
      passwordInputVal
    ) {
      let isUseremailVal = checkUserEmail(emailInputVal);
      const hashedPassword = passwordHash(passwordInputVal);

      if (isUseremailVal) {
        const userId = uniqueIdGenerator();
        const newUser = {
          id: userId,
          email: emailInputVal,
          username: usernameInputVal,
          password: passwordInputVal,
          profile: "",
        };
        let datas = getLocalStorage("users");
        datas.push(newUser);
        setLocalStorage("users", datas);
        console.log("işlem başarılı");
      } else return;
    } else return;
  }

  function hasUserStorage(email) {
    let users = getLocalstorage("users");
    let hasUser = users.find((user) => user.email == email);
  }
  function checkUserEmail(email) {
    let data = getLocalstorage("users");

    let findUser = data.find((user) => user.email == email);
    console.log(findUser);

    if (!findUser) {
      return true;
    } else {
      console.log("bu kullanıcı zaten var");
      return false;
    }
  }
  function getRegisterElements() {
    const userEmail = document.getElementById("email").value;
    const userName = document.getElementById("userName").value;
    const surname = document.getElementById("surName").value;
    const password = document.getElementById("password").value;

    const isInputValid = inputInvalid(userEmail, userName, surname, password);
    if (isInputValid) {
      console.log("Tüm alanlar dolu");
    } else {
      console.log("Tüm alanları doldurunuz");
    }
  }
  function profileUrl(url) {
    return url;
  }
  const registerButton = registerForm.querySelector("button");
  registerButton.addEventListener("click", () => {
    getRegisterElements();
  });

  function setLocalstorage(key, value) {
    localStorage.setItem(JSON.stringify(key, value));
  }

  function getLocalstorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
})();
