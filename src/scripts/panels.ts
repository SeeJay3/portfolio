import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(Observer);

const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  const panels = document.querySelectorAll('.panel');
  const outerWrappers = gsap.utils.toArray<HTMLElement>('.panel .outer');
  const innerWrappers = gsap.utils.toArray<HTMLElement>('.panel .inner');
  const panelContents = gsap.utils.toArray<HTMLElement>('.panel .panel-content');

  let currentIndex = -1;
  let animating = false;
  const lastIndex = panels.length - 1;

  gsap.set(outerWrappers, { yPercent: 100 });
  gsap.set(innerWrappers, { yPercent: -100 });

  function gotoSection(index: number, direction: number) {
    if (index < 0 || index > lastIndex || animating) return;
    animating = true;
    const dFactor = direction === -1 ? -1 : 1;

    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power1.inOut' },
      onComplete: () => {
        animating = false;
        window.dispatchEvent(new CustomEvent('panelchange', { detail: { index } }));
      },
    });

    if (currentIndex >= 0) {
      gsap.set(panels[currentIndex], { zIndex: 0 });
      tl.to(panelContents[currentIndex], { yPercent: -5 * dFactor })
        .set(panels[currentIndex], { autoAlpha: 0 });
    }

    gsap.set(panels[index], { autoAlpha: 1, zIndex: 1 });

    tl.fromTo(
      [outerWrappers[index], innerWrappers[index]],
      { yPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0 },
      0
    ).fromTo(panelContents[index], { yPercent: 5 * dFactor }, { yPercent: 0 }, 0);

    currentIndex = index;
  }

  // Find the experiencias panel index
  const expPanelIndex = Array.from(panels).findIndex(
    (p) => (p as HTMLElement).dataset.section === 'experiencias'
  );

  // Observer: wheel navigation
  Observer.create({
    type: 'wheel',
    wheelSpeed: -1,
    onDown: () => {
      if (animating) return;
      if (currentIndex === expPanelIndex && (window as any).__expNav?.prev()) return;
      gotoSection(currentIndex - 1, -1);
    },
    onUp: () => {
      if (animating) return;
      if (currentIndex === expPanelIndex && (window as any).__expNav?.next()) return;
      gotoSection(currentIndex + 1, 1);
    },
    tolerance: 10,
    preventDefault: true,
  });

  // Show first panel
  gotoSection(0, 1);

  // Handle anchor navigation (header links)
  const sectionMap: Record<string, number> = {};
  panels.forEach((panel, i) => {
    const section = (panel as HTMLElement).dataset.section;
    if (section) sectionMap[section] = i;
  });

  document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!link) return;

    const targetId = link.getAttribute('href')!.slice(1);
    const targetIndex = sectionMap[targetId];

    if (targetIndex !== undefined && targetIndex !== currentIndex && !animating) {
      e.preventDefault();
      const direction = targetIndex > currentIndex ? 1 : -1;
      gotoSection(targetIndex, direction);
    }
  });

  // Expose for external use
  (window as any).__panelNav = {
    goto: gotoSection,
    getCurrentIndex: () => currentIndex,
  };
}
// Mobile: panels are styled as normal blocks via CSS
