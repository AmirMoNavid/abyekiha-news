export const END_POINTS = {
  ARTICLES: '/api/article',
  ARTICLES_LATEST: '/api/article/latest',
  ARTICLES_MOST_VIEWED: '/api/article?orderBy=viewCount&limit=4',
  ARTICLES_HOME: '/api/article?limit=9',
  ARTICLES_COUNT: '/api/article?count=1',
  ARTICLE_ID: '/api/article/:id',
  ARTICLE_CATEGORY_ID: '/api/article/catId/:catId',
  ARTICLE_COMMENTS: '/api/comment/:articleId',
  ARTICLE_SHAHRDARI: '/api/article/shahrdari',

  CATEGORY_SLUG: '/api/category/:slug',
  CATEGORY: '/api/category',
  CATEGORIES_SHOWED_ON_NAVBAR: '/api/category?showOnNavbar=1',

  FAQS: '/api/faqs',
  FAQـID: '/api/faqs/:faqId',
  FAQS_ACTIVE: '/api/faqs?isActive=1',
  FAQ_ID_UPVOTE: '/api/faqs/:faqId/upvote',
  FAQ_ID_DOWNVOTE: '/api/faqs/:faqId/downvote',

  COMMENTS: '/api/comment',
  COMMENTS_COUNT: '/api/comment?count=1',
  COMMENTS_ACTIVATE: '/api/comment/active/:commentId',
  COMMENTS_DEACTIVATE: '/api/comment/unactive/:commentId',

  USERS: '/api/users',
  USERS_LOGIN: '/api/users/logout',
  USERS_COUNT: '/api/users?count=1',

  SLIDESHOW: '/api/slideshow',

  POLL: '/api/poll/questions',
  POLL_ID: '/api/poll/questions/:pollId',
  POLL_RESPONSES: '/api/poll/responses',
  POLL_RESPONSES_ID: '/api/poll/responses/:pollId',
};
