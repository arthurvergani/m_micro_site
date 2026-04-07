import { useRef } from 'react';
import FitText from './FitText';
import './DetailPanel.css';

// SVG fallback — uncomment and restore MonthSvg usage below if needed
// import MaySvg from '../assets/svg/01-May.svg?react';
// import JuneSvg from '../assets/svg/02-June.svg?react';
// import JulySvg from '../assets/svg/03-July.svg?react';
// import AugustSvg from '../assets/svg/04-August.svg?react';
// import SeptemberSvg from '../assets/svg/05-September.svg?react';
// const MONTH_SVGS = {
//   May: MaySvg,
//   June: JuneSvg,
//   July: JulySvg,
//   August: AugustSvg,
//   September: SeptemberSvg,
// };

const BODY_TEXT =
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum ' +
  'dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non ' +
  'proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' +
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ' +
  'veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
  'commodo consequat.';

export default function DetailPanel({ month, isOpen }) {
  const videoRef = useRef(null);
  // SVG fallback:
  // const MonthSvg = MONTH_SVGS[month];

  return (
    <div className={`detail-panel ${isOpen ? 'detail-panel--open' : ''}`}>

      <div className="detail-panel__scroll">
        <div className="detail-panel__month-container">
          <FitText
            text={month}
            className={`detail-panel__month detail-panel__month--${month.toLowerCase()}`}
          />
          {/* SVG fallback:
          {MonthSvg && <MonthSvg className={`detail-panel__month detail-panel__month--${month.toLowerCase()}`} />}
          */}
        </div>

        <div className="detail-panel__body">
          {BODY_TEXT}
        </div>

        <div className="detail-panel__media">
          <video
            ref={videoRef}
            className="detail-panel__video"
            src="https://meister.tv/api/media/file/MEISTER_brandfilm.webm"
            autoPlay
            loop
            muted
            playsInline
            onMouseEnter={() => { videoRef.current.controls = true; }}
            onMouseLeave={() => { videoRef.current.controls = false; }}
          />
        </div>

        <div className="detail-panel__canvas">
          {/* Rive canvas placeholder */}
        </div>
      </div>
    </div>
  );
}
