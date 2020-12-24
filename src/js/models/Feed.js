import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';

export default class Feed {
  constructor() {
    this.articles = [];
    this.feeds = [];
  }

  async getArticles(tag, author, favorited, offset, limit = 10) {
    // /articles
    try {
      const res = await axios.get(ENTRYPOINT + `/articles`,
      {
        params: {
          tag,
          author,
          favorited,
          offset,
          limit
        }
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.articles = [...res.data.articles];
      return res;
    } catch (err) {
      return err.response.data.errors;
    }
  }
}
