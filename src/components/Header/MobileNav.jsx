import React, { useContext } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import MenuContext from '../../context/MenuContext';

function MobileNav(props) {
  const { menuLinks } = props;
  const menuContext = useContext(MenuContext);

  return (
    <nav className={classnames('mobile-nav px-3', { 'mobile-nav__show': menuContext.mobileNavShow})}>
      <ul className="mobile-nav__menus">
        {menuLinks.map(link => (
          <li key={link.name} className="menu-item">
            <Link to={link.link} activeClassName="active">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MobileNav;
