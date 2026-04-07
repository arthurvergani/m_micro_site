import './LinkBar.css';

export default function LinkBar() {
  return (
    <nav className="link-bar">
      <div className="link-bar__left">
        <a className="link-bar__item" href="https://meister.tv" target="_blank" rel="noopener noreferrer">
          <span className="link-bar__icon" />
          <span>meister.tv</span>
        </a>
        <span className="link-bar__address">110 SE 8th Ave, Portland, OR 97214</span>
      </div>
      <div className="link-bar__right">
        <a className="link-bar__item" href="https://www.instagram.com/meister_hq" target="_blank" rel="noopener noreferrer">
          <span className="link-bar__icon" />
          <span>Instagram</span>
        </a>
        <a className="link-bar__item" href="https://www.linkedin.com/company/meister-studios/" target="_blank" rel="noopener noreferrer">
          <span className="link-bar__icon" />
          <span>Linkedin</span>
        </a>
        <a className="link-bar__item link-bar__email" href="mailto:info@meister.tv">
          info@meister.tv
        </a>
      </div>
    </nav>
  );
}
