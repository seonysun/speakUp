import { delay, http, HttpResponse } from 'msw';
import { challenges } from '../data/challenges';

const challengeHandler = [
  http.get('/api/challenges', async () => {
    await delay(1000);
    return HttpResponse.json(challenges, { status: 200 });
  }),
];

export default challengeHandler;
