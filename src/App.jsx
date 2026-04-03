import { useState } from 'react';
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
  },
  {
    month: 'June',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem02.png?alt=media&token=b71e88de-3d0c-4bb4-a666-5065a5f9805f',
  },
  {
    month: 'July',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem03.png?alt=media&token=958a7e01-87fd-4fe9-852d-e7a78e5813df',
  },
  {
    month: 'August',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem04.png?alt=media&token=f92558f4-5750-44d3-8450-d833581ff9d4',
  },
  {
    month: 'September',
    thumbnail: 'https://firebasestorage.googleapis.com/v0/b/m-micro-site.firebasestorage.app/o/thumbnails%2Fitem05.png?alt=media&token=4748150f-30d9-4da2-b963-3c216ebbc070',
  },
];

function App() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  const isExpanded = selectedMonth !== null;

  const handleItemClick = (month) => {
    setSelectedMonth(month === selectedMonth ? null : month);
  };

  const handleClose = () => {
    setSelectedMonth(null);
  };

  return (
    <div className={`site ${isExpanded ? 'site--expanded' : ''}`}>
      <CubeBackground isExpanded={isExpanded} />
      <LinkBar />

      <div className="main-view">
        <div
          className="main-view__content"
          onClick={isExpanded ? handleClose : undefined}
          style={isExpanded ? { cursor: 'pointer' } : undefined}
        >
          <div className="logo-container">
            <RiveLogo />
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
          {ITEMS.map(({ month, thumbnail }) => (
            <PageItem
              key={month}
              month={month}
              thumbnail={thumbnail}
              isSelected={selectedMonth === month}
              onClick={() => handleItemClick(month)}
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
