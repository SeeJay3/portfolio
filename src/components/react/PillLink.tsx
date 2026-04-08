import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

interface PillLinkProps {
  href: string;
  label: string;
  i18nKey?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
}

const PillLink: React.FC<PillLinkProps> = ({
  href,
  label,
  i18nKey,
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#0f0f0f',
  hoveredPillTextColor = '#0f0f0f',
  pillTextColor,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const circleRef = useRef<HTMLSpanElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const pillRef = useRef<HTMLAnchorElement>(null);

  const layout = useCallback(() => {
    const circle = circleRef.current;
    const pill = pillRef.current;
    if (!circle || !pill) return;

    const rect = pill.getBoundingClientRect();
    const { width: w, height: h } = rect;
    const R = ((w * w) / 4 + h * h) / (2 * h);
    const D = Math.ceil(2 * R) + 2;
    const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
    const originY = D - delta;

    circle.style.width = `${D}px`;
    circle.style.height = `${D}px`;
    circle.style.bottom = `-${delta}px`;

    gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

    const labelEl = pill.querySelector('.pill-label') as HTMLElement;
    const hoverEl = pill.querySelector('.pill-label-hover') as HTMLElement;

    if (labelEl) gsap.set(labelEl, { y: 0 });
    if (hoverEl) gsap.set(hoverEl, { y: h + 12, opacity: 0 });

    tlRef.current?.kill();
    const tl = gsap.timeline({ paused: true });

    tl.to(circle, { scale: 2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);
    if (labelEl) tl.to(labelEl, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
    if (hoverEl) {
      gsap.set(hoverEl, { y: Math.ceil(h + 100), opacity: 0 });
      tl.to(hoverEl, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
    }

    tlRef.current = tl;
  }, [ease]);

  useEffect(() => {
    layout();
    window.addEventListener('resize', layout);
    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }
    return () => window.removeEventListener('resize', layout);
  }, [layout]);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    activeTweenRef.current?.kill();
    activeTweenRef.current = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' });
  };

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <a
      ref={pillRef}
      role="menuitem"
      href={href}
      className="pill"
      style={cssVars}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <span className="hover-circle" aria-hidden="true" ref={circleRef} />
      <span className="label-stack">
        <span className="pill-label" data-i18n={i18nKey}>{label}</span>
        <span className="pill-label-hover" aria-hidden="true" data-i18n={i18nKey}>{label}</span>
      </span>
    </a>
  );
};

export default PillLink;
