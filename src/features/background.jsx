import react from "react";
import { useRef, useEffect, useState } from "react";
import { RandomMovies } from "@/scripts/api/Movie";
import { CreateCard } from "@/components/cards";

import { useNavigate } from "react-router";

// require("@tailwindcss/vite");
import LetterGlitch from "../components/LetterGlitch";

// Canvas Background

import { motion } from "motion/react";
import GridMotion from "../components/GridMotion";

import "../style/motion.css";
import { TMDB_IMAGE_BASE_URL } from "@/scripts/api";
import { drawCanvas } from "@/scripts/animations";

const items = Array.from({ length: 9 }, (_, i) => i + 1);

export function CanvasBackground() {
  let canvaElement = useRef(null);
  useEffect(() => {
    let canvas = canvaElement.current;
    const ctx = canvas.getContext("2d");

    class Particle {
      constructor(x, y, radius, color) {
        this.originalX = x;
        this.originalY = y;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
      }

      drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        this.decreaseDistance();
      }

      Glow(mouseX, mouseY) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const distance = Math.hypot(dx, dy);

        if (distance < 100) {
          // Particle is close to mouse → repel
          const force = (100 - distance) / 100; // stronger when closer
          const angle = Math.atan2(dy, dx);

          this.x += Math.cos(angle) * force * 5; // push away
          this.y += Math.sin(angle) * force * 5;

          this.radius = 2;
          this.color = "rgba(255, 255, 255, 1)";
        } else {
          // Reset to normal
          this.radius = 1;
          this.color = "rgba(255, 255, 255, 0.5)";
        }
      }

      decreaseDistance() {
        // Smoothly return to original position when far from mouse
        if (this.x > this.originalX) this.x -= 0.15;
        if (this.x < this.originalX) this.x += 0.15;
        if (this.y > this.originalY) this.y -= 0.15;
        if (this.y < this.originalY) this.y += 0.15;
      }
    }
    class Effect {
      constructor(radius, color) {
        this.canvaElement = canvaElement.current;
        this.particlesArray = [];
        this.radius = radius;
        this.color = color;
      }

      CreateParticles(ctx) {
        for (let x = 0; x < canvaElement.current.width; x += 25) {
          for (let y = 0; y < canvaElement.current.height; y += 25) {
            const particle = new Particle(x, y, this.radius, this.color);
            particle.drawCircle(ctx);
            this.particlesArray.push(particle);
          }
        }
        // console.log(this.particlesArray);
      }
      DrawParticles(ctx) {
        this.particlesArray.forEach((particle) => {
          particle.drawCircle(ctx);
        });
      }
      GlowParticles(mouseX, mouseY) {
        this.particlesArray.forEach((particle) => {
          particle.Glow(mouseX, mouseY);
        });
      }
    }

    // Create Effect (Partical Controller)
    const effect = new Effect(1, "rgba(255, 255, 255, 0.5)");
    effect.CreateParticles(ctx);

    // Animation Loop
    function animate() {
      ctx.clearRect(
        0,
        0,
        canvaElement.current.width,
        canvaElement.current.height,
      );
      effect.DrawParticles(ctx);
      requestAnimationFrame(animate);
    }
    animate();

    // Mouse Feature
    let mouseX = null;
    let mouseY = null;

    const updateGlow = () => {
      if (mouseX === null || mouseY === null) return;

      ctx.clearRect(
        0,
        0,
        canvaElement.current.width,
        canvaElement.current.height,
      );
      effect.GlowParticles(mouseX, mouseY);
    };

    const handleMouseMove = (e) => {
      // Particles are positioned in document coordinates because the canvas is absolute.
      mouseX = e.clientX + window.scrollX;
      mouseY = e.clientY + window.scrollY;
      updateGlow();
    };

    const handleScroll = () => {
      updateGlow();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleResize = () => {
      canvaElement.current.width = window.innerWidth - 5;
      canvaElement.current.height =
        window.innerHeight + document.documentElement.scrollHeight;
      // console.log(canvaElement.current.width, canvaElement.current.height);

      effect.particlesArray = [];
      effect.CreateParticles(ctx);
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };

    // Canvas Drawing Logic
    // function drawParticles() {
  }, []);

  return (
    <>
      <canvas
        style={{
          position: "absolute",
        }}
        ref={canvaElement}
      ></canvas>
      <div className="canvas-container">
        <div className="canvas-cover"></div>
      </div>
    </>
  );
}

export function LinearBackground() {
  return (
    <div className="fixed z-[-1] min-w-screen overflow-hidden min-h-screen">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.12) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          mixBlendMode: "normal",
        }}
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(rgba(14,165,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.06) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
          mixBlendMode: "normal",
        }}
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 pointer-events-none blur-[175px] md:blur-[252px]"
        style={{
          background:
            "radial-gradient(circle at 48% 93%, rgba(6,182,212,0.35) 0%, transparent 45%)",
          mixBlendMode: "screen",
        }}
        aria-hidden="true"
      ></div>
      <div className="relative z-[1]">{/* Your content */}</div>
    </div>
  );
}

export function LucidShowCase() {
  return (
    <div className="container ">
      <h1>Motion Grid</h1>

      <div className="grid">
        {items.map((item, index) => (
          <motion.div
            key={item}
            className="grid-item"
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.08,
              rotate: 2,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function GlitchMotion() {
  const [data, setData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const pullRandomMovies = async () => {
      const response = await RandomMovies(10, "popular");
      const result = response.results.map((ele, index) => {
        // return TMDB_IMAGE_BASE_URL + ele.poster_path;
        return (
          <CreateCard
            key={index}
            movie={ele}
            className={`circle-card-${index}`}
          />
        );
      });
      setData(result);
      console.log(data);
    };
    pullRandomMovies();
  }, []);

  return (
    <div
      style={{ position: "relative", zIndex: "2", width: "100%", height: 600 }}
    >
      <GridMotion
        items={data}
        rows={4}
        aspectRatio={1.33}
        gap={16}
        radius={14}
        angle={0}
        tilt={5}
        speed={10}
        direction="alternate"
        parallax={0.5}
        spotlight={0.5}
        dim={0.15}
        fade={0.3}
        grayscale={false}
      />
    </div>
  );
}
