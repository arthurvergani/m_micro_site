import React, { useCallback, useId, useMemo, useRef } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import './PixelTrail.css';

const PixelTrail = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className = '',
  pixelClassName = '',
}) => {
  const containerRef = useRef(null);
  const trailId = useId();
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  const resizeObserverRef = useRef(null);
  const callbackRef = useCallback((node) => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }
    if (node) {
      containerRef.current = node;
      const observer = new ResizeObserver(([entry]) => {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      });
      observer.observe(node);
      resizeObserverRef.current = observer;
    }
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId}-pixel-${x}-${y}`
      );
      if (pixelElement) {
        const animatePixel = pixelElement.__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize, trailId]
  );

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  );
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  );

  return (
    <div
      ref={callbackRef}
      className={`pixel-trail ${className}`}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="pixel-trail__row">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
              className={pixelClassName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTrail;

const PixelDot = React.memo(
  ({ id, size, fadeDuration, delay, className = '' }) => {
    const controls = useAnimationControls();

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      });
    }, [controls, fadeDuration, delay]);

    const ref = useCallback(
      (node) => {
        if (node) {
          node.__animatePixel = animatePixel;
        }
      },
      [animatePixel]
    );

    return (
      <motion.div
        id={id}
        ref={ref}
        className={`pixel-trail__dot ${className}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      />
    );
  }
);

PixelDot.displayName = 'PixelDot';
