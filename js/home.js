function initHomePage() {
  const cardsContainer = document.getElementById("cards-container");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImg = document.querySelector(".modal-img");
  const closeBtn = document.querySelector(".close-btn");
  const searchInput = document.getElementById("searchInput");
  const profileValue = document.querySelector(".value");
  const profileValueItalic = document.querySelector(".value.italic");

  let figuresData = [];

  fetch("/jsons/personas.json")
    .then((res) => res.json())
    .then((data) => {
      figuresData = data;
      renderCards(data);
    })
    .catch((err) => console.error("Veri yüklenemedi:", err));

  function renderCards(figures) {
    cardsContainer.innerHTML = "";
    figures.forEach((figure) => {
      const card = document.createElement("button");
      card.classList.add("card");
      card.dataset.name = figure.name;
      card.innerHTML = `
        <img src="${figure.image}" alt="${figure.name}" />
        <h3>${figure.name}</h3>
        <p>${figure.field}</p>
      `;
      cardsContainer.appendChild(card);

      card.addEventListener("click", () => {
        modalTitle.textContent = figure.name;
        modalDescription.textContent = figure.era;
        modalImg.src = figure.image;
        profileValue.textContent = figure.knowledge_limit;
        profileValueItalic.textContent = figure.tone_guideline;
        modal.classList.add("show");
        modal.style.display = "flex";
      });
    });
  }

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = figuresData.filter((fig) =>
      fig.name.toLowerCase().includes(query)
    );
    renderCards(filtered);
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("start-btn")) {
      e.preventDefault();
      const selectedPerson = {
        img: modalImg.src,
        name: modalTitle.textContent,
        era: modalDescription.textContent,
        knowledge_limit: profileValue.textContent,
      };
      setLocal("selectedPerson", selectedPerson);
      const modal = document.getElementById("modal");
      modal.classList.remove("show");
      modal.style.display = "none";
      window.navigateTo("/chat");
    }
  });
}

if (window.location.pathname === "/") {
  initHomePage();
}

// SPA route değiştiğinde (örn. nav tıklama sonrası), tekrar yükle
document.addEventListener("spa:page-changed", () => {
  if (window.location.pathname === "/") {
    initHomePage();
  }
});

function setLocal(key, value) {
  localStorage.setItem(key,JSON.stringify(value));
}
