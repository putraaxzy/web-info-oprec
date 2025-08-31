document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const sections = document.querySelectorAll("section[id]");
  const fadeInElements = document.querySelectorAll(
    "#timeline .card, #divisi .p-4, #guidebook .accordion-item, #contact .card, #peluang-khusus .alert"
  );

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    if (navbar) {
      navbar.classList.toggle("navbar-scrolled", scrollY > 50);
    }

    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      if (scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    fadeInElements.forEach((el) => {
      el.classList.add("fade-in-element");
      observer.observe(el);
    });
  }
});
