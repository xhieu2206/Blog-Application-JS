import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';

const itemsPerPage = 10;

const pageCalc = feedsCount => Math.ceil(feedsCount/itemsPerPage);

export default class Feed {
  constructor() {
    this.articles = [];
  }

  async getArticles(tag, author, favorited, page, limit = itemsPerPage) {
    // /articles
    try {
      const res = await axios.get(ENTRYPOINT + `/articles`,
      {
        params: {
          tag,
          author,
          favorited,
          offset: (page - 1) * limit,
          limit
        }
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.articles = [...res.data.articles];
      this.currentPage = page;
      this.totalArticals = res.data.articlesCount;
      this.totalPages = pageCalc(res.data.articlesCount);
      return res;
    } catch (err) {
      alert('Error while getting for articles');
    }
  }

  async getArticlesWithToken(token, tag, author, favorited, page, limit = itemsPerPage) {
    // /articles
    try {
      const res = await axios(
        {
          method: 'get',
          url: ENTRYPOINT + `/articles`,
          params: {
            tag,
            author,
            favorited,
            offset: (page - 1) * limit,
            limit
          },
          headers: {
            "Content-Type": "application/json",
            "authorization": `Token ${token}`
          }
        }
      );
      this.articles = [...res.data.articles];
      this.currentPage = page;
      this.totalArticals = res.data.articlesCount;
      this.totalPages = pageCalc(res.data.articlesCount);
      return res;
    } catch (err) {
      alert('Error while getting for articles');
    }
  }

  async getFeeds(token, page, limit = itemsPerPage) {
    // articles/feed
    try {
      const res = await axios(
        {
          method: 'get',
          url: ENTRYPOINT + `/articles/feed`,
          params: {
            offset: (page - 1) * limit,
            limit
          },
          headers: {
            "Content-Type": "application/json",
            "authorization": `Token ${token}`
          }
        }
      );
      this.articles = [...res.data.articles];
      this.currentPage = page;
      this.totalArticals = res.data.articlesCount;
      this.totalPages = pageCalc(res.data.articlesCount);
      return res;
    } catch (err) {
      alert('Error while getting for articles');
    }
  }
}
