import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, label, [tabindex]:not([tabindex="-1"]), [onclick], [data-cursor-interactive="true"]';

const DOT_SIZE = 6;
const RING_SIZE = 28;
const AURA_SIZE = 55;
const RING_LERP = 0.28;
const AURA_LERP = 0.16;

function setCursorPosition(element: HTMLElement, x: number, y: number, size: number) {
  element.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    if (!dot || !ring || !aura) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let auraX = mouseX;
    let auraY = mouseY;
    let rafId = 0;
    let clickTimeout = 0;

    const setVisible = (visible: boolean) => {
      const value = visible ? "true" : "false";
      dot.dataset.visible = value;
      ring.dataset.visible = value;
      aura.dataset.visible = value;
    };

    const setInteractive = (interactive: boolean) => {
      const value = interactive ? "true" : "false";
      dot.dataset.interactive = value;
      ring.dataset.interactive = value;
      aura.dataset.interactive = value;
    };

    const triggerClick = () => {
      window.clearTimeout(clickTimeout);
      dot.dataset.clicking = "true";
      ring.dataset.clicking = "true";
      clickTimeout = window.setTimeout(() => {
        dot.dataset.clicking = "false";
        ring.dataset.clicking = "false";
      }, 220);
    };

    const animate = () => {
      ringX += (mouseX - ringX) * RING_LERP;
      ringY += (mouseY - ringY) * RING_LERP;
      auraX += (mouseX - auraX) * AURA_LERP;
      auraY += (mouseY - auraY) * AURA_LERP;

      setCursorPosition(ring, ringX, ringY, RING_SIZE);
      setCursorPosition(aura, auraX, auraY, AURA_SIZE);
      rafId = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setCursorPosition(dot, mouseX, mouseY, DOT_SIZE);
      setVisible(true);
    };

    const handlePointerOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      setInteractive(Boolean(target.closest(INTERACTIVE_SELECTOR)));
    };

    const handlePointerOut = (event: PointerEvent) => {
      const relatedTarget = event.relatedTarget;
      if (!(relatedTarget instanceof Element)) {
        setInteractive(false);
        return;
      }

      setInteractive(Boolean(relatedTarget.closest(INTERACTIVE_SELECTOR)));
    };

    const handlePointerDown = () => triggerClick();
    const handlePointerLeave = () => setVisible(false);
    const handlePointerEnter = () => setVisible(true);

    setVisible(false);
    setInteractive(false);
    dot.dataset.clicking = "false";
    ring.dataset.clicking = "false";
    setCursorPosition(dot, mouseX, mouseY, DOT_SIZE);
    setCursorPosition(ring, ringX, ringY, RING_SIZE);
    setCursorPosition(aura, auraX, auraY, AURA_SIZE);
    rafId = window.requestAnimationFrame(animate);

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(clickTimeout);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, []);

  return (
    <>
      <div id="cursor-aura" ref={auraRef} aria-hidden="true">
        <div className="cursor-aura-visual" />
      </div>
      <div id="cursor-ring" ref={ringRef} aria-hidden="true">
        <div className="cursor-ring-visual" />
      </div>
      <div id="cursor-dot" ref={dotRef} aria-hidden="true">
        <div className="cursor-dot-visual" />
      </div>
    </>
  );
}
