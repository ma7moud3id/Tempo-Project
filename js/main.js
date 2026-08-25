document.addEventListener("DOMContentLoaded", function () {
  // 1) Toggle Navigation Menu
  const toggleBtn = document.getElementById("listToggle");
  const navList = document.getElementById("list");
  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", () => {
      navList.classList.toggle("d-none");
      toggleBtn.classList.toggle("open");
    });
    navList.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        navList.classList.add("d-none");
        toggleBtn.classList.remove("open");
      });
    });
  }

  // 2) Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (href.length > 1) {
      anchor.addEventListener("click", e => {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
  });

  // 3) Scroll-to-top button
  const upBtn = document.querySelector(".up");
  if (upBtn) {
    upBtn.style.display = "none";
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) upBtn.style.display = "flex";
      else upBtn.style.display = "none";
    }, { passive: true });

    upBtn.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 4) Testimonials Slider
  const sliderWrapper = document.querySelector("#testimonials .items-wrapper");
  const slides = document.querySelectorAll("#testimonials .item");
  const prevBtn = document.querySelector("#testimonials .prev");
  const nextBtn = document.querySelector("#testimonials .next");

  if (sliderWrapper && slides.length) {
    let index = 0;
    let animating = false;
    const total = slides.length;
    const duration = 600;

    function goTo(n) {
      if (animating) return;
      animating = true;
      if (n >= total) n = 0;
      if (n < 0) n = total - 1;
      index = n;
      sliderWrapper.style.transition = `transform ${duration}ms ease`;
      sliderWrapper.style.transform = `translateX(${-index * 100}%)`;
      setTimeout(() => { animating = false; }, duration + 50);
    }
    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));

    let auto = setInterval(() => goTo(index + 1), 4000);
    sliderWrapper.addEventListener("mouseenter", () => clearInterval(auto));
    sliderWrapper.addEventListener("mouseleave", () => {
      clearInterval(auto);
      auto = setInterval(() => goTo(index + 1), 4000);
    });

    sliderWrapper.style.width = `${total * 100}%`;
    slides.forEach(s => s.style.width = `${100 / total}%`);
    goTo(0);
  }

  // 5) Parallax لصورة Call To Action (.cta)
  const ctaSection = document.querySelector(".cta");
  if (ctaSection) {
    window.addEventListener("scroll", () => {
      let offset = window.scrollY - ctaSection.offsetTop;
      ctaSection.style.backgroundPosition = `center ${offset * 0.5}px`;
    });
  }
});