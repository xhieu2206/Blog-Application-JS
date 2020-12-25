import axios from 'axios';

import { ENTRYPOINT } from '../constants/constant';

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
        headers: {
          "Content-Type": "application/json"
        }
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
