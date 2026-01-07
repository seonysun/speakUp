import axios from 'axios';
import { YOUTUBE_API_URL } from '../../constants/config';

const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

export const instance = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
});

export const youtubeInstance = axios.create({
  baseURL: YOUTUBE_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    accept: 'application/json',
  },
  params: {
    key: youtubeKey,
  },
});
