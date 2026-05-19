export function initScrollAnimation() {
  const header = document.querySelector(".header-container");
  let triggerAnimation = false;

  window.addEventListener("scroll", () => {
    if (!header) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 0) {
      header.style.backdropFilter = "blur(10px)";
      if (!triggerAnimation) {
        header.classList.add("fade-in");
        triggerAnimation = true;
      }
    } else {
      header.style.backgroundColor = "#131313";
      header.classList.remove("fade-in");
      header.style.backdropFilter = "none";
      triggerAnimation = false;
    }
  });
}

export function bellAnimation() {
  const bellIcon = document.querySelector(".fa-bell");

  if (!bellIcon) return;

  bellIcon.addEventListener("mouseenter", (e) => {
    e.target.classList.add("animate-bell");
  });

  bellIcon.addEventListener("animationend", (e) => {
    e.target.classList.remove("animate-bell");
  });
}

export function sliderAnimation() {
  const right = document.querySelector(`.arrow-right`);
  const left = document.querySelector(`.arrow-left`);
  let counter = 0;
  let maxSlide = document.getElementsByClassName(`hero-item`).length;

  right.addEventListener("click", () => {
    if (counter > maxSlide) return;
    counter++;
  });
  left.addEventListener("click", () => {
    if (counter < 1) return;
    counter--;
  });
}
