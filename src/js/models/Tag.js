import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';
import { headersGenerator } from '../utils/Header';
export default class Tag {
  constructor() {
    this.tags = [];
    this.tag = '';
  }

  async getTags() {
    // /tags
    try {
      const res = await axios({
        method: 'GET',
        url: `${ENTRYPOINT}/tags`,
        headers: headersGenerator()
      });
      this.tags = [...res.data.tags];
      return res;
    } catch (err) {
      alert('Error while getting for tags');
    }
  }

  setTag(tag) {
    this.tag = tag;
  }
}
