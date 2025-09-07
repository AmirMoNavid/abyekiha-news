import { create } from 'zustand';

import { getCookie } from 'cookies-next';

export const useStore = create((set) => ({
  categories: [],
  articles: [],
  latestNews: [],
  token: getCookie('refreshToken'),
  comments: [],
  host:
    process.env.NODE_ENV === 'production'
      ? 'https://abyekiha.ir'
      : 'http://localhost:3000',
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.abyekiha.ir'
      : 'http://localhost:5000',
  isLoading: false,

  setCategories: (cats) => set((state) => ({ categories: cats })),
  setIsLoading: (isLoading) => set((state) => ({ isLoading: isLoading })),
  setArticles: (articles) => set((state) => ({ articles: articles })),
  setLatestNews: (latest) => set((state) => ({ latestNews: latest })),
  setComments: (comments) => set((state) => ({ comments: comments })),
}));
