import TypewriterText from './TypewriterText';

const Header = () => {
  return (
    <div className="header-container">
      <div className="header-image">
        <img 
          src="/images/web/header.jpeg" 
          alt="Adrián López Pisá" 
          className="profile-image"
        />
      </div>
      <div className="header-content">
        <div className="header-title">

          <h1>Adrián López Pisá</h1>
        </div>
        <h2>Senior Backend Developer</h2>
        <TypewriterText text="Engineer by vocation, Senior Backend Developer by profession." />
      </div>
    </div>
  );
};

export default Header; 