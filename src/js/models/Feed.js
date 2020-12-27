import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';
import { headersGenerator } from '../utils/Header';

const itemsPerPage = 10;

const pageCalc = feedsCount => Math.ceil(feedsCount/itemsPerPage);

export default class Feed {
  constructor() {
    this.articles = [];
    this.currentArticle = {};
    this.currentPage = 1;
    this.totalArticals = 0;
    this.totalPages = 0;
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
        headers: headersGenerator()
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
          headers: headersGenerator(token)
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
          url: `${ENTRYPOINT}/articles/feed`,
          params: {
            offset: (page - 1) * limit,
            limit
          },
          headers: headersGenerator(token)
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

  async newFeed(token, title, description, body, tagList) {
    // /articles
    try {
      const res = await axios.post(`${ENTRYPOINT}/articles`, {
        "article": {
          "title": title,
          "description": description,
          "body": body,
          "tagList": tagList
        }
      }, {
          headers: headersGenerator(token)
      });
      this.currentArticle = res.data.article;
      return res.data.article;
    } catch (err) {
      return err.response.data.errors;
    }
  }

  async getArticle(slug, token = '') {
    // /articles/:slugtry
    try {
      const res = await axios({
        method: 'GET',
        url: `${ENTRYPOINT}/articles/${slug}`,
        headers: headersGenerator(token)
      });
      this.currentArticle = res.data.article;
    } catch (err) {
      alert('Error while loading an article');
    }
  }
}
