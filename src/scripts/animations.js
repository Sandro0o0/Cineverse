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
// Hightlight canvas logic

export function drawCanvas() {
  const canvas = document.querySelector(".highlight-overlay");
  const ctx = canvas.getContext("2d");

  let mouseX = null;
  let mouseY = null;

  let bubbleArr = [];

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  window.addEventListener("resize", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  });

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  class Bubble {
    constructor(width, height, x, y) {
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.image = document.getElementById("movie-png");
      this.addIndex = 1;
      // this.randomAngle = Math.round(Math.random(0, 0.5));
      this.randomIndex = Math.round(Math.random(0, 1));
      this.angleObj = {
        0: Math.round(Math.random(0, 1)),
        1: -Math.round(Math.random(0, 1)),
      };
    }

    update(context) {
      this.y -= this.addIndex;
      this.addIndex += 0.05;

      this.x += this.angleObj[this.randomIndex];

      context.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height - 10,
        this.x - 37,
        this.y - 37,
        75,
        75,
      );
      // context.rotate(0.001);
    }
  }

  canvas.onclick = () => {
    const bubble = new Bubble(canvas.width, canvas.height, mouseX, mouseY);
    bubbleArr.push(bubble);
  };
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbleArr.forEach((e, index) => {
      if (e.y < 0) {
        bubbleArr.splice(index, 1);
        console.log(bubbleArr);
      }
      e.update(ctx);
    });
    requestAnimationFrame(animate);
  }
  animate();
}
