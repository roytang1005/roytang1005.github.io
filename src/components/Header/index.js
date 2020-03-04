import React from 'react';
import { Link } from 'gatsby';
import { MenuProvider } from '../../context/MenuContext';
import Nav from './Nav';
import MobileNav from './MobileNav';
import config from '../../../data/SiteConfig';
import brand from '../../images/gatsby-icon.png';

function Header() {
  return (
    <MenuProvider>
      <header className="try-header">
        <div className="container-lg d-flex flex-row flex-justify-between flex-items-center py-3 px-3">
          <div className="brand">
            <Link className="d-flex flex-items-center" to="/">
              <img className="brand-img" src={brand} width="28" height="28" alt="Brand" />
              <h1 className="brand-title h4 text-normal pl-3 alt-mono-font">{config.siteTitle}</h1>
            </Link>
          </div>
          <Nav menuLinks={config.menuLinks} />
        </div>
        <MobileNav menuLinks={config.menuLinks} />
      </header>
    </MenuProvider>
  )
}

export default Header;
