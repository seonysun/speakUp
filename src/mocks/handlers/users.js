import { delay, http, HttpResponse } from 'msw';
import { users } from '../data/users';

const userHandler = [
  http.get('http://localhost:3000/api/users', async () => {
    await delay(1000);
    return HttpResponse.json(users, { status: 200 });
  }),
];

export default userHandler;
