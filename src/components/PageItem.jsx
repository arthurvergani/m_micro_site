import { useRef } from 'react';
import './PageItem.css';

export default function PageItem({ month, thumbnail, isSelected, onClick }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={`page-item ${isSelected ? 'page-item--selected' : ''}`}
      onClick={onClick}
    >
      <div className="page-item__title">
        <span>{month}</span>
      </div>
      <div
        className="page-item__thumbnail"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={`${month} thumbnail`}
            className="page-item__image"
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
      </div>
    </div>
  );
}
