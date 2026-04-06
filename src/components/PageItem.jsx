import { useRef, useState, useCallback, useEffect, useId } from 'react';
import PixelTrail from './PixelTrail';
import './PageItem.css';

export default function PageItem({ revealDelay, month, thumbnail, isSelected, onClick, onThumbnailLoad }) {
  const videoRef = useRef(null);
  const imgRef = useRef(null);
  const thumbnailRef = useRef(null);
  const floodRef = useRef(null);
  const compositeRef = useRef(null);
  const morphRef = useRef(null);
  const animRef = useRef(null);
  const filterId = useId().replace(/:/g, '');
  const [pixelated, setPixelated] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  useEffect(() => {
    if (revealDelay == null) return;
    const id = setTimeout(() => setVisible(true), revealDelay);
    return () => clearTimeout(id);
  }, [revealDelay]);

  const animatePixelation = useCallback((forward) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);

    const from = forward ? 12 : 32;
    const to = forward ? 32 : 12;
    const duration = 120;
    const start = performance.now();

    if (forward) setPixelated(true);

    const update = (size) => {
      const half = size / 2;
      floodRef.current?.setAttribute('x', half);
      floodRef.current?.setAttribute('y', half);
      compositeRef.current?.setAttribute('width', size);
      compositeRef.current?.setAttribute('height', size);
      morphRef.current?.setAttribute('radius', half + 1);

      if (imgRef.current && thumbnailRef.current) {
        const w = thumbnailRef.current.offsetWidth;
        imgRef.current.style.width = Math.ceil(w / size) * size + 'px';
      }
    };

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      update(from + (to - from) * t);
      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else if (!forward) {
        if (imgRef.current) imgRef.current.style.width = '';
        setPixelated(false);
      }
    };

    animRef.current = requestAnimationFrame(tick);
  }, []);

  const handleMouseEnter = () => {
    videoRef.current?.play();
    animatePixelation(true);
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    animatePixelation(false);
  };

  return (
    <div
      className={`page-item ${isSelected ? 'page-item--selected' : ''} ${visible ? 'page-item--visible' : ''}`}
      onClick={onClick}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id={filterId} x="0" y="0" width="100%" height="100%">
          <feFlood ref={floodRef} x="6" y="6" height="1" width="1" />
          <feComposite ref={compositeRef} width="12" height="12" />
          <feTile result="a" />
          <feComposite in="SourceGraphic" in2="a" operator="in" />
          <feMorphology ref={morphRef} operator="dilate" radius="6" />
        </filter>
      </svg>

      <div className="page-item__title">
        <span>{month}</span>
      </div>
      <div
        ref={thumbnailRef}
        className="page-item__thumbnail"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {thumbnail && (
          <img
            ref={imgRef}
            src={thumbnail}
            alt={`${month} thumbnail`}
            className="page-item__image"
            style={pixelated ? { filter: `url(#${filterId})` } : undefined}
            onLoad={onThumbnailLoad}
          />
        )}
        <video
          ref={videoRef}
          className="page-item__video"
          muted
          loop
          playsInline
          preload="metadata"
        >
          {/* <source src={`/videos/${month.toLowerCase()}.mp4`} type="video/mp4" /> */}
        </video>
        <div className="page-item__overlay" />
        <div className="page-item__pixel-trail">
          <PixelTrail
            pixelSize={32}
            delay={130}
            fadeDuration={0}
            pixelClassName="pixel-trail__dot--red"
          />
        </div>
      </div>
    </div>
  );
}
