const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  // Toggle Nav
  [burger, ...navLinks].forEach((element, index) => {
    element.addEventListener("click", () => {
      nav.classList.toggle("nav-active");
      // Burger Animation
      burger.classList.toggle("toggle");
      // Animate Links
      navLinks.forEach((link, index) => {
        if (window.innerWidth < 767) {
          if (link.style.animation) {
            link.style.animation = "";
          } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
          }
        }
      });
    });
  });
};

navSlide();

// Scroll Reveal

ScrollReveal().reveal("#about");
ScrollReveal().reveal("#portfolio");
ScrollReveal().reveal("#contact");
