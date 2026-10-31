import { expect, test, type APIRequestContext } from '@playwright/test';

const endpoint = 'https://graphqlzero.almansi.me/api';

type GraphQLResponse = {
  data?: Record<string, any> | null;
  errors?: Array<{ message: string }>;
};

async function runQuery(
  request: APIRequestContext,
  operationName: string,
  query: string,
  variables: Record<string, unknown>,
) {
  return request.post(endpoint, {
    headers: { 'content-type': 'application/json' },
    data: { operationName, query, variables },
  });
}

function expectNoGraphQLErrors(payload: GraphQLResponse) {
  expect(payload.errors ?? []).toEqual([]);
}

test.describe('GraphQLZero API queries', () => {
  test('gets a post by ID', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetPostById',
      `query GetPostById($id: ID!) {
        post(id: $id) {
          id
          title
          body
        }
      }`,
      { id: '1' },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeDefined();
    expectNoGraphQLErrors(payload);
    expect(payload.data?.post).toMatchObject({ id: '1' });
    expect(payload.data?.post.title).toEqual(expect.any(String));
    expect(payload.data?.post.body).toEqual(expect.any(String));
  });

  test('gets a user by ID', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetUserById',
      `query GetUserById($id: ID!) {
        user(id: $id) {
          id
          name
          username
          email
        }
      }`,
      { id: '1' },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeDefined();
    expectNoGraphQLErrors(payload);
    expect(payload.data?.user).toMatchObject({
      id: '1',
      name: 'Leanne Graham',
      username: 'Bret',
    });
    expect(payload.data?.user.email).toEqual(expect.any(String));
  });

  test('gets posts associated with a user', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetUserPosts',
      `query GetUserPosts($id: ID!, $options: PageQueryOptions) {
        user(id: $id) {
          id
          posts(options: $options) {
            data {
              id
              title
              body
            }
          }
        }
      }`,
      { id: '1', options: { paginate: { page: 1, limit: 2 } } },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeDefined();
    expectNoGraphQLErrors(payload);
    expect(payload.data?.user.id).toBe('1');
    expect(payload.data?.user.posts.data).toHaveLength(2);
    expect(payload.data?.user.posts.data[0]).toMatchObject({ id: '1' });
    expect(payload.data?.user.posts.data[0].title).toEqual(expect.any(String));
    expect(payload.data?.user.posts.data[0].body).toEqual(expect.any(String));
  });

  test('gets a paginated list of posts', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetPosts',
      `query GetPosts($options: PageQueryOptions) {
        posts(options: $options) {
          data {
            id
            title
            body
          }
        }
      }`,
      { options: { paginate: { page: 1, limit: 3 } } },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeDefined();
    expectNoGraphQLErrors(payload);
    expect(payload.data?.posts.data).toHaveLength(3);
    expect(payload.data?.posts.data[0]).toMatchObject({ id: '1' });
    expect(payload.data?.posts.data[0].title).toEqual(expect.any(String));
    expect(payload.data?.posts.data[0].body).toEqual(expect.any(String));
  });

  test('gets a paginated list of comments', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetComments',
      `query GetComments($options: PageQueryOptions) {
        comments(options: $options) {
          data {
            id
            name
            email
            body
            post {
              id
            }
          }
        }
      }`,
      { options: { paginate: { page: 1, limit: 3 } } },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeDefined();
    expectNoGraphQLErrors(payload);
    expect(payload.data?.comments.data).toHaveLength(3);
    expect(payload.data?.comments.data[0]).toMatchObject({
      id: '1',
      name: 'id labore ex et quam laborum',
      post: { id: '1' },
    });
    expect(payload.data?.comments.data[0].email).toEqual(expect.any(String));
    expect(payload.data?.comments.data[0].body).toEqual(expect.any(String));
  });

  test('returns nullable fields for a nonexistent post ID', async ({ request }) => {
    const response = await runQuery(
      request,
      'GetMissingPost',
      `query GetMissingPost($id: ID!) {
        post(id: $id) {
          id
          title
        }
      }`,
      { id: '999999' },
    );

    expect(response.status()).toBe(200);
    const payload: GraphQLResponse = await response.json();
    expectNoGraphQLErrors(payload);
    expect(payload.data).toEqual({ post: { id: null, title: null } });
  });

  test('reports an error for an invalid GraphQL field', async ({ request }) => {
    const response = await runQuery(
      request,
      'InvalidPostField',
      `query InvalidPostField($id: ID!) {
        post(id: $id) {
          id
          definitelyNotAField
        }
      }`,
      { id: '1' },
    );

    expect(response.status()).toBe(400);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeUndefined();
    expect(payload.errors?.[0]?.message).toContain('Cannot query field');
  });

  test('reports an error when the variable type does not match the schema', async ({ request }) => {
    const response = await runQuery(
      request,
      'InvalidPostIdType',
      `query InvalidPostIdType($id: Int!) {
        post(id: $id) {
          id
        }
      }`,
      { id: 1 },
    );

    expect(response.status()).toBe(400);
    const payload: GraphQLResponse = await response.json();
    expect(payload.data).toBeUndefined();
    expect(payload.errors?.[0]?.message).toContain('Variable "$id" of type "Int!"');
    expect(payload.errors?.[0]?.message).toContain('expecting type "ID!"');
  });
});