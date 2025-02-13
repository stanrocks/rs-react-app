import React from 'react';
interface FooterProps {
  onClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onClick }) => {
  return (
    <footer className="footer">
      <button className="button-danger" onClick={onClick}>
        Crash the whole app!
      </button>
    </footer>
  );
};

export default Footer;
