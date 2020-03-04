import React from 'react';
import { Link } from 'gatsby';
import GatsbyImg from 'gatsby-image';
import dayjs from 'dayjs';

function PostListing(props) {
  const { postEdges } = props;
  
  const postList = postEdges.map(postEdge => ({
    path: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.fields.date,
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
    categories: postEdge.node.frontmatter.categories,
  }));

  return (
    <div className="all-posts__container">
      <h2 className="all-posts__title py-5">All posts</h2>
      <div className="all-posts__posts">
        {postList.map(post => {
          const dateTime = dayjs(post.date).format('YYYY-MM-DD');
          const dateTimeFormatted = dayjs(post.date).format('MMMM D, YYYY');
          return (
            <article key={post.title} className="post-item d-flex mb-8">
              <div className="post-item__date alt-mono-font">
                <a href={post.path}>
                  <time dateTime={dateTime} pubdate="true">{dateTimeFormatted}</time>
                </a>
              </div>
              <div className="post-item__content">
                <ul className="post-item__categories alt-mono-font d-flex flex-wrap flex-row mb-3">
                  {post.categories.map(categorie => (
                    <li key={categorie}>{categorie}</li>
                  ))}
                </ul>
                <div className="post-item__title f3 mb-4">
                  <a href={post.path}>{post.title}</a>
                </div>
                <div className="post-item__excerpt">
                  <p>{post.excerpt}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default PostListing;
