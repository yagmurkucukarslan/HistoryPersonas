(() => {
  const personImg = document.querySelector(".personImg");
  const personEra = document.querySelector(".person-era");
  const personKnowledgeLimit = document.querySelector(
    ".person-knowledge-limit"
  );

  const smallPersonImg = document.querySelector(".small-persona-img");
  const personName = document.querySelector(".persona-details-name");
  const personEraHeader = document.querySelector(".persona-era-header");

  function getlocal(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  const selectedPerson = getlocal("selectedPerson");
  if (!selectedPerson) {
    console.warn(
      "⚠️ Seçilen persona bulunamadı. Kullanıcı başka bir sayfadan gelmiş olabilir."
    );
    return;
  }

  personImg.src = selectedPerson.img;
  personEra.textContent = selectedPerson.era;
  personKnowledgeLimit.textContent = selectedPerson.knowledge_limit;
  smallPersonImg.src = selectedPerson.img;
  personName.textContent = selectedPerson.name;
  personEraHeader.textContent = selectedPerson.era;
})();
