import React, { useContext, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'react-feather';
import PropTypes from 'prop-types';
import { NavContext } from 'components/nav/Nav';
import { useLocation } from 'react-router-dom';

export const DropdownContext = React.createContext(null);

const NavDropdown = ({ label, icon: Icon, children, defaultOpen }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const [isActive, setActive] = useState(false);

  const { isMobile } = useContext(NavContext);
  const links = useRef([]);
  const { pathname } = useLocation();
  const itemsListRef = useRef();

  const menuClass = isMobile ? 'menu' : 'side-menu';

  const className = [menuClass];
  if (isOpen) {
    className.push(`${menuClass}--open`);
  }
  if (isActive) {
    className.push(`${menuClass}--active`);
  }

  const open = () => {
    const $ul = $(itemsListRef.current);
    setOpen(true);
    $ul.slideDown({
      done: () => {
        $ul.addClass(`${menuClass}__sub-open`);
      },
    });
  };

  const close = () => {
    const $ul = $(itemsListRef.current);
    setOpen(false);
    $ul.slideUp({
      done: () => {
        $ul.removeClass(`${menuClass}__sub-open`);
      },
    });
  };

  const toggle = () => {
    if (!isOpen) {
      open();
    } else {
      close();
    }
  };

  useEffect(() => {
    if (Array.isArray(children)) {
      links.current = children.map((child) => child.props.link);
    } else {
      links.current = [children.props.link];
    }
    if (defaultOpen) {
      open();
    }
  }, []);

  useEffect(() => {
    const match = links.current.find((link) => pathname.startsWith(link));
    setActive(!!match);
  }, [pathname]);

  return (
    <li>
      <a
        href="#?"
        className={className.join(' ')}
        onClick={toggle}
      >
        <div className={`${menuClass}__icon`}>
          <Icon />
        </div>
        <div className={`${menuClass}__title`}>
          {label}
          <ChevronDown className={`${menuClass}__sub-icon ${isOpen && 'transform rotate-180'}`} />
        </div>
      </a>
      <ul ref={itemsListRef}>
        <DropdownContext.Provider
          value={{ isOpen, setOpen, isActive, setActive }}
        >
          {children}
        </DropdownContext.Provider>
      </ul>
    </li>
  );
};

NavDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  defaultOpen: PropTypes.bool,
};
NavDropdown.defaultProps = {
  defaultOpen: false,
};

export default NavDropdown;
