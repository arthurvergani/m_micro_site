import { useRef, useEffect, useCallback } from 'react';

/**
 * Renders text that scales uniformly to fill its container width,
 * similar to how an SVG with viewBox scales — no distortion.
 * The container height adjusts automatically to match the scaled text.
 */
export default function FitText({ text, className = '' }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const rescale = useCallback(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    // Reset so we can measure natural dimensions
    textEl.style.transform = 'none';
    container.style.height = 'auto';

    const containerWidth = container.clientWidth;
    const naturalWidth = textEl.scrollWidth;
    const naturalHeight = textEl.offsetHeight;

    if (naturalWidth > 0) {
      const scale = containerWidth / naturalWidth;
      textEl.style.transform = `scale(${scale})`;
      // Set container height to match the scaled text height
      container.style.height = `${naturalHeight * scale}px`;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(rescale);
    ro.observe(container);

    rescale();

    return () => ro.disconnect();
  }, [rescale, text]);

  return (
    <div ref={containerRef} className={className} style={{ overflow: 'hidden' }}>
      <span
        ref={textRef}
        style={{
          display: 'block',
          whiteSpace: 'nowrap',
          transformOrigin: 'left top',
          willChange: 'transform',
        }}
      >
        {text}
      </span>
    </div>
  );
}
