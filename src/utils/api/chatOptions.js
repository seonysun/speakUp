import { instance } from './instance';

const chatOptions = {
  getChatList: (pageParam = 0, limit = 10) => ({
    queryKey: ['chats', pageParam],
    queryFn: async () => {
      const { data } = await instance.get('/api/posts', {
        params: { pageParam, limit },
      });
      return data;
    },
  }),
  getUsers: () => ({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await instance.get('/api/users');
      return data;
    },
  }),
  getChat: (postId) => ({
    queryKey: ['chats', postId],
    queryFn: async () => {
      const { data } = await instance.get(`/api/posts/${postId}`);
      return data;
    },
  }),
  getComments: (postId) => ({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data } = await instance.get(`/comments?postId=${postId}`);
      return data;
    },
  }),

  updateViews: async (postId, currentViews) => {
    const { data } = await instance.patch(`/api/posts/${postId}/views`, {
      views: currentViews + 1,
    });
    return data;
  },
};

export default chatOptions;
