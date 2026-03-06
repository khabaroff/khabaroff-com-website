import { GraphQLClient } from 'tinacms/dist/client';

const client = new GraphQLClient('http://localhost:4001/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPostQuery = `
  query GetPost($relativePath: String!) {
    post(relativePath: $relativePath) {
      title
      date
      tags
      category
      type
      description
      draft
      heroImage
      heroAlt
      relatedPosts
      body
    }
  }
`;

export async function getPostData(slug: string) {
  const relativePath = `${slug}.mdx`;
  
  try {
    const response = await client.request(getPostQuery, {
      relativePath,
    });
    
    return {
      data: response,
      query: getPostQuery,
      variables: { relativePath },
    };
  } catch (error) {
    console.error('Error fetching post data:', error);
    return null;
  }
}

export { client };
