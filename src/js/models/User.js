import axios from 'axios';

// xhieu94@gmail.com
// 12345678qeqe

import { ENTRYPOINT } from '../constants/constant';
import { headersGenerator } from '../utils/Header';

import UserData from './UserData';

export default class User {
  constructor() {
    this.isLoggedIn = false;
    this.token = '';
  }

  async login(email, password) {
    // /users/login
    try {
      const res = await axios.post(ENTRYPOINT + '/users/login', {
        "user": {
          "email": email,
          "password": password
        }
      }, {
        headers: headersGenerator()
      });

      this.setToken(res.data.user.token);
      this.isLoggedIn = true;
      this.userData = new UserData(res.data.user.id, res.data.user.email, res.data.user.id, res.data.user.image, res.data.user.username);
    } catch (err) {
      return err.response.data.errors;
    }
  }

  async signup(username, email, password) {
    // /api/users
    try {
      const res = await axios.post(ENTRYPOINT + '/users', {
        "user": {
          "username": username,
          "email": email,
          "password": password
        }
      }, {
        headers: headersGenerator()
      });

      this.setToken(res.data.user.token);
      this.isLoggedIn = true;
      this.userData = new UserData(res.data.user.id, res.data.user.email, res.data.user.id, res.data.user.image, res.data.user.username);
    } catch (err) {
      return err.response.data.errors;
    }
  }

  async getCurrentUser() {
    // /user
    try {
      const res = await axios({
        method: 'GET',
        url: `${ENTRYPOINT}/user`,
        headers: headersGenerator(this.getToken())
      });
      return res.data.user;
    } catch (err) {
      alert('Something went wrong when getting the current user');
    }
  }

  async updateUser(image, username, bio, email, password) {
    // PUT /user
    try {
      const res = await axios.put(
        `${ENTRYPOINT}/user`, {
          "user": {
            "image": image,
            "email": email,
            "username": username,
            "bio": bio,
            "password": password
          },
        }, {
          headers: headersGenerator(this.getToken())
        }
      );
      this.userData = new UserData(res.data.user.id, res.data.user.email, res.data.user.id, res.data.user.image, res.data.user.username);
      return 'Update successfully';
    } catch (err) {
      return err.response.data.errors;
    }
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
