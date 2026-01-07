import { instance } from './instance';

const challengeAPI = {
  challengeList: async () => {
    const { data } = await instance.get('/api/challenges');
    return data;
  },
  challenge: async (id) => {
    const { data } = await instance.get(`/api/challenges/${id}`);
    return data;
  },
};

export default challengeAPI;
