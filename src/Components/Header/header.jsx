import React, { useState, useEffect } from 'react';
import './Header.scss';
import cyberDoreeLogo from '../../assets/cyberdoree-removebg-preview.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container">
        <a href="#" className="header__logo">
          <img src={cyberDoreeLogo} alt="Cyber Dorée" className="header__logo-image" />
        </a>

        <nav className="header__nav">
          <ul className={`header__nav-menu ${isMenuOpen ? 'header__nav-menu--open' : ''}`}>
            <li><a href="#process" onClick={() => setIsMenuOpen(false)}>Boutique</a></li>
            <li><a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
            <li><a href="#about" onClick={() => setIsMenuOpen(false)}>À propos</a></li>
          </ul>
        </nav>

        <button
          className="header__burger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
