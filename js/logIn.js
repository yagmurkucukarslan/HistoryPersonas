(() => {
  const registerTab = document.getElementById("registerTab");
  const loginTab = document.getElementById("loginTab");
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const avatar = document.querySelector("#avatar");
  const fileInput = document.querySelector("#fileInput");

  // Yeni: seçilen veya üretilen avatar verisini sakla (dataURL)
  let selectedAvatar = null;

  /* -------------------------------------------------------------------------- */
  /*                              TAB GEÇİŞLERİ                                */
  /* -------------------------------------------------------------------------- */
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
  /* -------------------------------------------------------------------------- */
  /*                          GÖRSEL BOYUTU KÜÇÜLTME                        */
  /* -------------------------------------------------------------------------- */
  function compressImage(
    file,
    maxWidth = 300,
    maxHeight = 300,
    quality = 0.7,
    callback
  ) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        // Yeni boyut hesapla
        let ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

        // Resmi canvas’a çiz
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // JPEG formatında kaliteyi uygula
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        callback(compressedDataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* -------------------------------------------------------------------------- */
  /*                          PROFİL FOTOĞRAFI SEÇİMİ                          */
  /* -------------------------------------------------------------------------- */
  avatar.addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      compressImage(file, 300, 300, 0.7, (compressedUrl) => {
        avatar.src = compressedUrl;
        profileUrl(compressedUrl);
      });
    } else {
      const initials = getNameandSurname();
      const avatarUrl = generateInitialsAvatar(initials);
      avatar.src = avatarUrl;
      profileUrl(avatarUrl);
    }
  });

  /* -------------------------------------------------------------------------- */
  /*                            LOCAL STORAGE FONKS.                            */
  /* -------------------------------------------------------------------------- */
  function setLocalstorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getLocalstorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  /* -------------------------------------------------------------------------- */
  /*                             UNIQUE ID OLUŞTURMA                            */
  /* -------------------------------------------------------------------------- */
  function uniqueIdGenerator() {
    const random = Math.floor(Math.random() * 10000) + 1000;
    return uniqueIdChecker(random);
  }

  function uniqueIdChecker(uniqueId) {
    const users = getLocalstorage("users");
    const userIdCheck = users.find((user) => user.id === uniqueId);

    if (userIdCheck) {
      return uniqueIdGenerator(); // aynı id varsa yeniden oluştur
    } else {
      return uniqueId;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                             GİRİŞ KONTROL FONKS.                           */
  /* -------------------------------------------------------------------------- */
  function inputInvalid(...fields) {
    return fields.every((val) => val && val.trim() !== "");
  }

  function checkUserEmail(email) {
    const data = getLocalstorage("users");
    const findUser = data.find((user) => user.email === email);

    if (!findUser) {
      return true; // email kullanılabilir
    } else {
      console.log("Bu kullanıcı zaten var!");
      return false;
    }
  }

  function passwordHash(password) {
    // Basit hash örneği — istersen gerçek hash kütüphanesi eklenebilir
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = (hash << 5) - hash + password.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString();
  }

  /* -------------------------------------------------------------------------- */
  /*                             KULLANICI ADI SOYADI BAŞ HARFİNİ ALMA                         */
  /* -------------------------------------------------------------------------- */

  function getNameandSurname() {
    const usernameInputVal = document.getElementById("userName").value.trim();
    const surnameInputVal = document.getElementById("surName").value.trim();
    const firstLetterName = usernameInputVal
      ? usernameInputVal[0].toUpperCase()
      : "";
    const firstLetterSurname = surnameInputVal
      ? surnameInputVal[0].toUpperCase()
      : "";
    return firstLetterName + firstLetterSurname;
  }
  /* -------------------------------------------------------------------------- */
  /*                             isim soyisime göre avatar oluşturma                        */
  /* -------------------------------------------------------------------------- */
  function generateInitialsAvatar(initials) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const size = 128;
    canvas.width = canvas.height = size;

    // Arka plan için rastgele bir renk
    const colors = ["#6A67CE", "#FF8C42", "#2EC4B6", "#FF3366", "#06D6A0"];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Harfleri çiz
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, size / 2, size / 2);

    // Base64 URL olarak döndür
    return canvas.toDataURL("image/png");
  }

  /* -------------------------------------------------------------------------- */
  /*                              KULLANICI KAYIT                               */
  /* -------------------------------------------------------------------------- */
  function registerUser() {
    const emailInputVal = document.getElementById("email").value.trim();
    const usernameInputVal = document.getElementById("userName").value.trim();
    const surnameInputVal = document.getElementById("surName").value.trim();
    const passwordInputVal = document.getElementById("password").value.trim();

    if (
      !inputInvalid(
        emailInputVal,
        usernameInputVal,
        surnameInputVal,
        passwordInputVal
      )
    ) {
      console.log("Lütfen tüm alanları doldurun!");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInputVal)) {
      alert(
        "Lütfen geçerli bir e-posta adresi girin! (örn: kullanici@gmail.com)"
      );
      return;
    }
    if (!checkUserEmail(emailInputVal)) {
      console.log("Bu e-posta adresi zaten kayıtlı!");
      return;
    }

    const hashedPassword = passwordHash(passwordInputVal);
    const userId = uniqueIdGenerator();
    const initials = getNameandSurname();

    let finalAvatar = selectedAvatar;
    if (!finalAvatar || finalAvatar.trim() === "") {
      finalAvatar = generateInitialsAvatar(initials);
    }

    const newUser = {
      id: userId,
      email: emailInputVal,
      username: usernameInputVal,
      surname: surnameInputVal,
      password: hashedPassword,
      profile: finalAvatar,
      createdAt: new Date().toISOString(),
    };

    const users = getLocalstorage("users");
    users.push(newUser);
    setLocalstorage("users", users);

    console.log("Kullanıcı başarıyla kaydedildi!");
  }

  /* -------------------------------------------------------------------------- */
  /*                              KULLANICI GİRİŞ                               */
  /* -------------------------------------------------------------------------- */
  function loginUser() {
    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPassword = document.getElementById("loginPassword").value.trim();

    if (!inputInvalid(loginEmail, loginPassword)) {
      console.log("Lütfen tüm alanları doldurun!");
      return;
    }

    const users = getLocalstorage("users");
    const hashedInputPassword = passwordHash(loginPassword);

    const foundUser = users.find(
      (user) =>
        user.email === loginEmail && user.password === hashedInputPassword
    );

    if (foundUser) {
      console.log("✅ Giriş başarılı:", foundUser.username);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
    } else {
      alert("❌ E-posta veya şifre hatalı!");
      console.log("❌ E-posta veya şifre hatalı!");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              BUTTON EVENTLERİ                              */
  /* -------------------------------------------------------------------------- */
  const registerButton = registerForm.querySelector("button");
  registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    registerUser();
  });

  const loginButton = loginForm.querySelector("button");
  loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    loginUser();
  });

  function profileUrl(url) {
    selectedAvatar = url;
    return selectedAvatar;
  }
})();
