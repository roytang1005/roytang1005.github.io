import React, { useState, useContext, useEffect } from "react";
import { Link } from 'gatsby';
import ThemeContext from '../../context/ThemeContext';
import MenuContext from '../../context/MenuContext';
import classnames from 'classnames';

function Nav(props) {
  const { menuLinks } = props;
  const themeContxt = useContext(ThemeContext);
  const menuContext = useContext(MenuContext);
  // const [scrolled, setScrolled] = useState(false);
  // useEffect(() => {
  //   window.addEventListener('scroll', navOnScroll);
  //   return () => {
  //     window.removeEventListener('scroll', navOnScroll);
  //   };
  // });

  // function navOnScroll() {
  //   setScrolled(window.scrollY > 20);
  // };

  return (
    <div className="header-right d-flex flex-row flex-justify-between flex-items-center">
      <ul className="menus flex-row pr-3">
        {menuLinks.map(link => (
          <li key={link.name} className="menu-item">
            <Link to={link.link} activeClassName="active">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      <button className="dark-switcher" onClick={themeContxt.toggleDark}>
        {themeContxt.dark ? (
          <i className="ri-sun-line"></i>
        ) : (
          <i className="ri-moon-fill"></i>
        )}
      </button>
      <button className="mobile-nav__toggle px-2 ml-4" onClick={menuContext.toggleMobileNav}>
        <div className={classnames('burger-menu', { 'menu-active': menuContext.mobileNavShow })}>
          <div className="burger"></div>
        </div>
      </button>
    </div>
  );
};

export default Nav;
