import { useState, useRef, useCallback, useEffect } from 'react';
import LinkBar from './components/LinkBar';
import PageItem from './components/PageItem';
import DetailPanel from './components/DetailPanel';
import CubeBackground from './components/CubeBackground';
import RiveLogo from './components/RiveLogo';
import './App.css';

const ITEMS = [
  {
    month: 'May',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem01.png?alt=media&token=e97e70c4-f68b-453f-80f9-6bd6656fa7b9',
    accentColor: '#FF3C2B',
    detailText: '#FFFFFF',
  },
  {
    month: 'June',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem02.png?alt=media&token=b71e88de-3d0c-4bb4-a666-5065a5f9805f',
    accentColor: '#BBFF00',
    detailText: '#141414',
  },
  {
    month: 'July',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem03.png?alt=media&token=958a7e01-87fd-4fe9-852d-e7a78e5813df',
    accentColor: '#F7D200',
    detailText: '#141414',
  },
  {
    month: 'August',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem04.png?alt=media&token=f92558f4-5750-44d3-8450-d833581ff9d4',
    accentColor: '#F8C6F1',
    detailText: '#141414',
  },
  {
    month: 'September',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem05.png?alt=media&token=4748150f-30d9-4da2-b963-3c216ebbc070',
    accentColor: '#DFDFDF',
    detailText: '#141414',
  },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [revealStart, setRevealStart] = useState(false);
  const loadedCount = useRef(0);

  const handleThumbnailLoad = useCallback(() => {
    loadedCount.current += 1;
    if (loadedCount.current >= ITEMS.length) {
      setRevealStart(true);
    }
  }, []);

  const [highlightIndex, setHighlightIndex] = useState(-1);
  const highlightTimer = useRef(null);

  const startCycle = useCallback((delay = 0) => {
    clearInterval(highlightTimer.current);
    highlightTimer.current = null;

    const begin = () => {
      setHighlightIndex(0);
      highlightTimer.current = setInterval(() => {
        setHighlightIndex((prev) => (prev + 1) % ITEMS.length);
      }, 4000);
    };

    if (delay > 0) {
      highlightTimer.current = setTimeout(() => {
        begin();
      }, delay);
    } else {
      begin();
    }
  }, []);

  const stopCycle = useCallback(() => {
    clearInterval(highlightTimer.current);
    clearTimeout(highlightTimer.current);
    highlightTimer.current = null;
    setHighlightIndex(-1);
  }, []);

  // Start the cycle once thumbnails are loaded
  useEffect(() => {
    if (revealStart) {
      startCycle(4000);
    }
    return () => {
      clearInterval(highlightTimer.current);
      clearTimeout(highlightTimer.current);
    };
  }, [revealStart, startCycle]);

  const isExpanded = selectedMonth !== null;
  const selectedItem = ITEMS.find((item) => item.month === selectedMonth);
  const accentColor = selectedItem?.accentColor || '#FF3C2B';
  const detailText = selectedItem?.detailText || '#FFFFFF';

  const handleItemClick = (month) => {
    if (month === selectedMonth) {
      setSelectedMonth(null);
      startCycle(4000);
    } else {
      setSelectedMonth(month);
      stopCycle();
    }
  };

  const handleClose = () => {
    setSelectedMonth(null);
    startCycle(4000);
  };

  return (
    <div
      className={`site ${isExpanded ? 'site--expanded' : ''}`}
      style={{
        '--color-accent': accentColor,
        '--color-detail-text': detailText,
        '--color-linkbar-right': isExpanded
          ? (detailText === '#FFFFFF' ? '#C8C8C8' : '#646464')
          : undefined,
      }}
    >
      <CubeBackground isExpanded={isExpanded} />
      <LinkBar />

      <div className="main-view">
        <div
          className="main-view__content"
          onClick={isExpanded ? handleClose : undefined}
          style={isExpanded ? { cursor: 'pointer' } : undefined}
        >
          <div className="logo-container">
            <RiveLogo accentColor={accentColor} />
          </div>

          <div className="headline-container">
            <div className="headline__left">
              <p>What 2026</p>
              <p>is looking</p>
              <p>like</p>
            </div>
            <p className="headline__right">so far</p>
          </div>
        </div>

        <div className="menu-container">
          {ITEMS.map(({ month, thumbnail }, index) => (
            <PageItem
              key={month}
              revealDelay={revealStart ? index * 80 : null}
              month={month}
              thumbnail={thumbnail}
              isSelected={selectedMonth === month}
              isHighlighted={highlightIndex === index}
              titleOpacity={highlightIndex >= 0 ? (index === highlightIndex ? 1 : Math.max(0.2, 0.6 - (Math.abs(index - highlightIndex) - 1) * 0.1)) : 1}
              onClick={() => handleItemClick(month)}
              onThumbnailLoad={handleThumbnailLoad}
            />
          ))}
        </div>
      </div>

      <DetailPanel
        month={selectedMonth || ITEMS[0].month}
        isOpen={isExpanded}
      />
    </div>
  );
}

export default App;
