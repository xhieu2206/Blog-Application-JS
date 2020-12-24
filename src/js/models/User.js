import axios from 'axios';

// xhieu94@gmail.com
// 12345678qeqe

import { ENTRYPOINT } from '../constants/constant';

class UserData {
  constructor(bio, email, id, image, username) {
    this.bio = bio;
    this.email = email;
    this.id = id;
    this.image = image;
    this.username = username
  }
}

class Heeader {
  constructor(contentType, authorization) {
    this.contentType = contentType;
    this.authorization = authorization;
  }
}

export default class User {
  constructor() {
    this.isLoggedIn = false;
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
        headers: {
          "Content-Type": "application/json"
        }
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
        headers: {
          "Content-Type": "application/json"
        }
      });

      this.setToken(res.data.user.token);
      this.isLoggedIn = true;
      this.userData = new User(res.data.user.id, res.data.user.email, res.data.user.id, res.data.user.image, res.data.user.username);
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
