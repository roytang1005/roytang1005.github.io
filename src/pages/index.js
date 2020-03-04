import React from 'react';
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby"; 
// import GitHubButton from "react-github-btn";
import { MainLayout } from '../layout';
// // import PostListing from '../components/PostListing';
// import ProjectListing from '../components/ProjectListing';
// import SimpleListing from '../components/SimpleListing';
import { SEO, PostListing } from "../components";
import config from '../../data/SiteConfig';
// import quotes from '../../data/quotes';
// import roy from '../../content/images/roy-avatar.png';

function IndexPage(props) {
  const { data } = props;
  const postEdges = data.posts.edges;

  return (
    <MainLayout>
      <Helmet title={`${config.siteTitle} – Web Developer`} />
      <SEO />
      <div className="container section-wrap">
        <section className="section">
          <PostListing simple postEdges={postEdges} />
        </section>
      </div>
    </MainLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery {
    posts: allMarkdownRemark(
      limit: 10
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            date
            template
          }
        }
      }
    }
  }
`;
