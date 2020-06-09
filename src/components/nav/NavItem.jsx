import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { NavContext } from 'components/nav/Nav';
import { DropdownContext } from 'components/nav/NavDropdown';
import { ChevronRight } from 'react-feather';


const NavItem = (props) => {
  const ddContext = useContext(DropdownContext);
  const {
    isMobile,
    isOpen,
    isInitialAnimationShown,
    setInitialAnimationShown,
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
    } else if (!isMobile && !isInitialAnimationShown) {
      setInitialAnimationShown(true);
    }
  };

  useEffect(() => {
    if (ddContext) {
      ddContext.setActive(pathname.startsWith(link));
    }
  }, [pathname]);

  return (
    <li onClick={handleClick}>
      <NavLink
        exact
        to={link}
        className={`${menuClass} ${isInitialAnimationShown ? 'no-animation' : ''}`}
        activeClassName={`${menuClass}--active`}
      >
        <div className={`${menuClass}__icon`}>
          <Icon />
        </div>
        <div className={`${menuClass}__title`}> {children}</div>
      </NavLink>
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
