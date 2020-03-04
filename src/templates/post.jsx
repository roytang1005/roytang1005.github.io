import React from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import dayjs from 'dayjs';
import { MainLayout } from '../layout';
import { SEO } from '../components';
import config from '../../data/SiteConfig';

function PostTemplate(props) {
  const { data } = props;
  const postNode = data.markdownRemark;
  const { frontmatter: post, fields } = postNode;
  const postDate = dayjs(post.date).format('MMMM D, YYYY');
  const postDateTime = dayjs(post.date).format('YYYY-MM-DD');
  console.log(post);

  return (
    <MainLayout>
      <Helmet title={`${post.title} – ${config.siteTitle}`} />
      <SEO postPath={fields.slug} postNode={postNode} postSEO />
      <article className="main-post container-md px-3 py-4">
        {post.cover ? (
          <div className="post-cover mb-8">
            <GatsbyImage fluid={post.cover.childImageSharp.fluid} />
          </div>
        ) : null}
        <div className="post-header mb-6">
          <div className="post-meta my-3">
            <div className="post-meta__date alt-mono-font">
              <time dateTime={postDateTime}>{postDate}</time>
            </div>
            <span className="spacer-line"></span>
            <ul className="post-meta__categories d-flex flex-items-center alt-mono-font">
              {post.categories.map(categorie => (
                <li key={categorie}>
                  <Link to="/">{categorie}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="post-title my-2">
            <h1>{post.title}</h1>
          </div>
          <ul className="post-tags d-flex flex-items-center alt-mono-font">
            {post.tags.map(tag => (
              <li key={tag}>
                <Link to="/">{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="post-content" dangerouslySetInnerHTML={{ __html: postNode.html }} />
      </article>
      {/* <UserInfo config={config} />  */}
    </MainLayout>
  );
}

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html,
      timeToRead
      excerpt
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
