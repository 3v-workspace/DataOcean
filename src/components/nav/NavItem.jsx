import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { NavContext } from 'components/nav/Nav';
import { DropdownContext } from 'components/nav/NavDropdown';
import { ChevronRight } from 'react-feather';


const NavItem = (props) => {
  const ddContext = useContext(DropdownContext);
  const {
    isMobile,
    isOpen,
    toggleMobile,
  } = useContext(NavContext);

  const { pathname } = useLocation();

  const { link, icon: Icon, children } = props;
  const menuClass = isMobile ? 'menu' : 'side-menu';

  const handleClick = () => {
    // if (ddContext) {
    //   ddContext.setOpen(false);
    // }

    if (isMobile && isOpen) {
      toggleMobile();
    }
  };

  useEffect(() => {
    if (ddContext) {
      ddContext.setActive(pathname.startsWith(link));
    }
  }, [pathname]);

  const linkClass = [menuClass];
  if (pathname.startsWith(link)) {
    linkClass.push(`${menuClass}--active`);
  }

  return (
    <li onClick={handleClick}>
      <Link
        to={link}
        className={linkClass.join(' ')}
      >
        <div className={`${menuClass}__icon`}>
          <Icon />
        </div>
        <div className={`${menuClass}__title`}> {children}</div>
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};
NavItem.defaultProps = {
  icon: ChevronRight,
};

export default NavItem;
