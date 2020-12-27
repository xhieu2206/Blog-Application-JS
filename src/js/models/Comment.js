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
}
