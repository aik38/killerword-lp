(() => {
  "use strict";

  // Googleフォーム作成後、公開URLをここへ設定してください。
  const GOOGLE_FORM_URL = "";

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("is-open", !isOpen);
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.classList.toggle("nav-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const updateHeader = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 10);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  if (GOOGLE_FORM_URL) {
    document.querySelectorAll("[data-google-form]").forEach((link) => {
      link.href = GOOGLE_FORM_URL;
      link.hidden = false;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  }

  const ga4Id = document.body.dataset.ga4Id;
  if (ga4Id && /^G-[A-Z0-9]+$/i.test(ga4Id)) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", ga4Id, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(script);
  }
})();
