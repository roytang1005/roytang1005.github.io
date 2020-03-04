import React from 'react';
import Helmet from 'react-helmet';
import { MainLayout } from '../layout';
import { SEO } from '../components';
import config from '../../data/SiteConfig';

function AboutMe() {
  return (
    <MainLayout>
      <Helmet title={`${config.siteTitle} – Contact`} />
      <SEO />
      <div>Contact</div>
    </MainLayout>
  )
}

export default AboutMe;
