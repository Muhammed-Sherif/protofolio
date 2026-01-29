import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <a href="#" className="logo">Portfolio</a>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="menu-bar" />
          <span className="menu-bar" />
          <span className="menu-bar" />
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <a href="#" className="nav-link" onClick={handleNavClick}>Home</a>
          <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
          <a href="#services" className="nav-link" onClick={handleNavClick}>Services</a>
          <a href="#projects" className="nav-link" onClick={handleNavClick}>Projects</a>
          <a href="#skills" className="nav-link" onClick={handleNavClick}>Skills</a>
          <a href="#contact" className="nav-link" onClick={handleNavClick}>Contact</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
