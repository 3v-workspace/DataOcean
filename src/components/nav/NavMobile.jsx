import React, { useState } from 'react';
import { BarChart2 } from 'react-feather';

// todo: add slideUp/slideDown animation
const NavMobile = ({ children }) => {
  const [isOpen, setOpened] = useState(false);
  return (
    <div className="mobile-menu md:hidden">
      <div className="mobile-menu-bar">
        <a href="/home/" className="flex mr-auto">
          <img alt="Data Ocean" className="w-6" src="/images/logo.svg" />
        </a>
        <a href="#?" id="mobile-menu-toggler" onClick={() => setOpened(!isOpen)}>
          <BarChart2 className="w-8 h-8 text-white transform -rotate-90" />
        </a>
      </div>
      <ul className="border-t border-theme-24 py-5 hidden" style={isOpen ? { display: 'block' } : { display: 'none' }}>
        {children}
      </ul>
    </div>
  );
};

export default NavMobile;
