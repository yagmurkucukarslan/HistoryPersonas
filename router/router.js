document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }

  e.preventDefault();
  urlRoute(e);
});

const urlRoutes = {
  404: {
    template: "/templates/404.html",
    title: "404 Error",
    description: "",
  },
  "/": {
    template: "/templates/home.html",
    title: "",
    description: "",
  },
  "/explore": {
    template: "/templates/explore.html",
    title: "",
    description: "",
  },
  "/myechoes": {
    template: "/templates/myechoes.html",
    title: "",
    description: "",
  },
  "/community": {
    template: "/templates/community.html",
    title: "",
    description: "",
  },
  "/profile": {
    template: "/templates/profile.html",
    title: "My Profile",
    description: "",
  },
  "/logIn": {
    template: "/templates/logIn.html",
    title: "My Profile",
    description: "",
  },
};

const urlRoute = (event) => {
  event = event || window.event;
  event.preventDefault();
  const targetUrl =
    event.target.getAttribute("href") || event.target.dataset.href;
  if (!targetUrl) return;
  window.history.pushState({}, "", targetUrl);
  urlLocationHandler();
};

const urlLocationHandler = async () => {
  console.log("Çağrıldım");

  let location = window.location.pathname;

  if (location.length === 0) {
    location = "/";
  }

  if (!urlRoutes[location]) {
    console.warn("Sayfa bulunamadı, 404'e yönlendiriliyor...");
    window.history.pushState({}, "", 404);
    const fallback = await fetch(urlRoutes[404].template).then((r) => r.text());
    document.getElementById("main-page").innerHTML = fallback;
    loadPageScript("/404");
  } else {
    const route = urlRoutes[location];
    const response = await fetch(route.template);
    const html = await response.text();
    document.getElementById("main-page").innerHTML = html;
    loadPageScript(location);
  }

  const links = document.querySelectorAll("nav a");
  links.forEach((link) => {
    if (link.getAttribute("href") === location) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

window.onpopstate = urlLocationHandler;
window.route = urlRoute;

/* urlLocationHandler(); */

const loadPageScript = (path) => {
  const oldScript = document.getElementById("page-script");
  if (oldScript) oldScript.remove();

  let fileName = path === "/" ? "home" : path.replace("/", "");

  const scriptPath = `/js/${fileName}.js`;

  const script = document.createElement("script");
  script.src = scriptPath;
  script.id = "page-script";

  script.onload = () => console.log(`${scriptPath} yüklendi ✅`);
  script.onerror = () => console.warn(`${scriptPath} bulunamadı ❌`);

  document.body.appendChild(script);
};

window.addEventListener("DOMContentLoaded", async () => {
  await urlLocationHandler();
});
