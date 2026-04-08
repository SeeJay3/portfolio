import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    color: { value: "#6c63ff" },
    links: {
      color: "#6c63ff",
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.8,
      direction: "none",
      outModes: { default: "out" },
    },
    number: {
      value: 60,
      density: { enable: true, width: 1920, height: 1080 },
    },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4 } },
    },
  },
  detectRetina: true,
};

async function init() {
  await loadSlim(tsParticles);

  const sections = document.querySelectorAll<HTMLElement>("section");

  sections.forEach((section, i) => {
    // Create a container div for particles
    const container = document.createElement("div");
    container.id = `particles-${i}`;
    Object.assign(container.style, {
      position: "absolute",
      inset: "0",
      zIndex: "0",
      pointerEvents: "none",
    });

    // Make section a positioning context
    section.style.position = "relative";
    section.style.overflow = "hidden";

    // Insert particles behind content
    section.insertBefore(container, section.firstChild);

    // Ensure existing content is above particles
    Array.from(section.children).forEach((child) => {
      if (child !== container && child instanceof HTMLElement) {
        child.style.position = "relative";
        child.style.zIndex = "1";
      }
    });

    tsParticles.load({ id: container.id, options });
  });
}

init();
