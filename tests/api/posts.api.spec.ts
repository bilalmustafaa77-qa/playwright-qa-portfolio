import { test, expect } from '@playwright/test';

// Public fake REST API used for demonstration: https://jsonplaceholder.typicode.com
const BASE = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET /posts/1 returns 200 with the expected schema', async ({ request }) => {
    const res = await request.get(`${BASE}/posts/1`);
    expect(res.status()).toBe(200);

    const post = await res.json();
    expect(post).toMatchObject({ id: 1 });
    expect(typeof post.userId).toBe('number');
    expect(typeof post.title).toBe('string');
    expect(typeof post.body).toBe('string');
  });

  test('GET /posts?userId=1 returns only that user\'s posts', async ({ request }) => {
    const res = await request.get(`${BASE}/posts`, { params: { userId: 1 } });
    expect(res.ok()).toBeTruthy();

    const posts: Array<{ userId: number }> = await res.json();
    expect(posts.length).toBeGreaterThan(0);
    for (const p of posts) expect(p.userId).toBe(1);
  });

  test('POST /posts creates a post and echoes the payload', async ({ request }) => {
    const payload = { title: 'QA portfolio', body: 'Created by an automated test', userId: 7 };
    const res = await request.post(`${BASE}/posts`, { data: payload });
    expect(res.status()).toBe(201);

    const created = await res.json();
    expect(created).toMatchObject(payload);
    expect(created.id).toBeDefined();
  });

  test('negative: GET a non-existent post returns 404', async ({ request }) => {
    const res = await request.get(`${BASE}/posts/999999`);
    expect(res.status()).toBe(404);
  });
});
