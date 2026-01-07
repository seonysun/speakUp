import { delay, http, HttpResponse } from 'msw';
import { posts } from '../data/posts';

const baseURL = 'http://localhost:3000';

const postHandler = [
  // 게시글 목록 가져오기
  http.get(`${baseURL}/api/posts`, async ({ request }) => {
    const url = new URL(request.url);
    const pageParam = Number(url.searchParams.get('pageParam')) || 0;
    const limit = Number(url.searchParams.get('limit')) || 10;

    const start = pageParam * limit;
    const end = start + limit;
    const paginatedPosts = posts.slice(start, end);

    await delay(1000);
    return HttpResponse.json(paginatedPosts, { status: 200 });
  }),

  // 조회수 증가
  http.patch(`${baseURL}/api/posts/:id/views`, async ({ params }) => {
    const { id } = params;
    const postIndex = posts.findIndex((post) => post.id === id);

    if (postIndex === -1) {
      return HttpResponse.json(
        { message: '게시글을 찾을 수 없습니다' },
        { status: 404 },
      );
    }

    posts[postIndex].views = (posts[postIndex].views || 0) + 1;

    await delay(1000);
    return HttpResponse.json(posts[postIndex], { status: 200 });
  }),

  // 게시글 조회
  http.get(`${baseURL}/api/posts/:id`, async ({ params }) => {
    const { id } = params;
    const post = posts.find((el) => el.id === id);

    await delay(1000);
    return HttpResponse.json(post, { status: 200 });
  }),
];

export default postHandler;
