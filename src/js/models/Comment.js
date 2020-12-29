import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';
import { headersGenerator } from '../utils/Header';

export default class Comment {
  constructor() {
    this.comments = []
  }

  fetchComments(articleSlug, token = '') {
    // /articles/:slug/comments
    return new Promise((resolve, reject) => {
      fetch(`${ENTRYPOINT}/articles/${articleSlug}/comments`, {
        method: 'GET',
        headers: headersGenerator(token)
      })
        .then(response => response.json())
        .catch(() => alert('Something went wrong when getting comments'))
        .then(data => {
          this.comments = [...data.comments];
          resolve(data);
        })
        .catch(err => reject(err));
    });
  }

  async addComment(articleSlug, body, token) {
    // POST articles/:slug/comments
    try {
      const res = await axios.post(`${ENTRYPOINT}/articles/${articleSlug}/comments`, {
        "comment": {
          "body": body
        }
      }, {
        headers: headersGenerator(token)
      });
      return res.data.comment;
    } catch (err) {
      return err.response.data.errors;
    }
  }

  async deleteComment(token, articleSlug, commentId) {
    // DELETE /api/articles/:slug/comments/:id
    try {
      const res = axios({
        method: 'DELETE',
        url: `${ENTRYPOINT}/articles/${articleSlug}/comments/${commentId}`,
        headers: headersGenerator(token)
      });
      return 'Success'
    } catch(err) {
      return 'Error';
    }
  }
}
