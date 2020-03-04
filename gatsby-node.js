/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require('path');
const kebabCase = require('lodash.kebabcase');

const postNodes = []

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    if (
      Object.prototype.hasOwnProperty.call(node, 'frontmatter') &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, 'title')
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}/`
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`
    } else if (parsedFilePath.dir === '') {
      slug = `/${parsedFilePath.name}/`
    } else {
      slug = `/${parsedFilePath.dir}/`
    }

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug')) slug = `/${node.frontmatter.slug}/`;

      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = new Date(node.frontmatter.date)

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        })
      }
    }
    createNodeField({
      node,
      name: 'slug',
      value: slug 
    })
    postNodes.push(node);
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // templates
  const postTemplate = path.resolve('src/templates/post.jsx');
  // const pageTemplate = path.resolve('src/templates/page');
  // const tagTemplate = path.resolve('src/templates/tag');
  // const categoryTemplate = path.resolve('src/templates/category');

  const res = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                tags
                categories
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );
  
  if (res.errors) {
    console.log(res.errors);
    return;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  res.data.allMarkdownRemark.edges.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag)
      })
    }

    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach(category => {
        categorySet.add(category)
      })
    }

    if (edge.node.frontmatter.template === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: postTemplate,
        context: {
          slug: edge.node.fields.slug,
        },
      })
    }

    // if (edge.node.frontmatter.template === 'page') {
    //   createPage({
    //     path: edge.node.fields.slug,
    //     component: pageTemplate,
    //     context: {
    //       slug: edge.node.fields.slug,
    //     },
    //   })
    // }
  })

  // const tagList = Array.from(tagSet)
  // tagList.forEach(tag => {
  //   createPage({
  //     path: `/tags/${kebabCase(tag)}/`,
  //     component: tagTemplate,
  //     context: {
  //       tag,
  //     },
  //   })
  // })

  // const categoryList = Array.from(categorySet)
  // categoryList.forEach(category => {
  //   createPage({
  //     path: `/categories/${category.toLowerCase()}/`,
  //     component: categoryTemplate,
  //     context: {
  //       category,
  //     },
  //   })
  // })
}
