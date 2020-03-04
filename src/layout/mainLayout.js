import React, { useContext } from 'react';
import Helmet from 'react-helmet';
import ThemeContext from '../context/ThemeContext';
import { Header } from '../components';
// import Footer from '../components/Footer';
import config from '../../data/SiteConfig';
import favicon from '../images/gatsby-icon.png';
import '../styles/main.scss';

function MainLayout(props) {
  const theme = useContext(ThemeContext);
  const { dark, notFound } = theme;
  const { children } = props;

  let themeClass = '';
    
  if (dark && !notFound) {
    themeClass = 'dark'
  } else if (notFound) {
    themeClass = 'not-found';
  };

  return (
    <>
      <Helmet
        bodyAttributes={{
          class: `theme ${themeClass}`,
        }}
      >
        <meta name="description" content={config.siteDescription} />
        <link rel="shortcut icon" type="image/png" href={favicon} />
      </Helmet>
      <Header />
      <main id="main-content">{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
