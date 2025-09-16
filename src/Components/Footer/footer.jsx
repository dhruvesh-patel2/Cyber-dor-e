import React from 'react';
import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Cyber Dorée. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
