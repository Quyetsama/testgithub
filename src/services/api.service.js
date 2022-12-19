import { ApiBase } from '../configs/app.config';
import axios from "axios";

let store

export const injectStore = _store => {
  store = _store
}

export class ApiService {
  static BASE_URL = ApiBase;

  static async getGenres() {
    const response = await this.request('genre');
    return response.data;
  }

  static async createGenre(name, image) {
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('image', image);

    const response = await this.request('genre', {
      method: 'POST',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  }

  static async deleteGenre(id) {
    const response = await this.request('genre', {
      method: 'DELETE',
      data: {
        id
      },
    });
    return response.data;
  }

  static async editGenre(id, genre) {
    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    bodyFormData.append('name', genre.name);
    if (genre.image) {
      bodyFormData.append('image', genre.image);
    }

    const response = await this.request('genre', {
      method: 'PATCH',
      data: bodyFormData,
    });
    return response.data;
  }

  static async getMovies() {
    const response = await this.request('movie');
    return response.data;
  }

  static async createMovie(movie, episodes) {
    let bodyFormData = new FormData();

    Object.keys(movie).map(el => {
      bodyFormData.append(el, movie[el]);
    })

    episodes.map(el => {
      bodyFormData.append('movies', el);
    })

    const response = await this.request('movie/upload', {
      method: 'POST',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  }

  static async deleteMovie(id) {
    const response = await this.request('movie', {
      method: 'DELETE',
      data: {
        id
      },
    });
    return response.data;
  }

  static async editMovie(id, movie) {
    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    Object.keys(movie).map(el => {
      bodyFormData.append(el, movie[el]);
    })

    const response = await this.request('movie', {
      method: 'PATCH',
      data: bodyFormData,
    });
    return response.data;
  }

  static async addEpisode(id, episode) {
    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    bodyFormData.append('movie', episode);

    const response = await this.request('movie/episode', {
      method: 'POST',
      data: bodyFormData,
    });
    return response.data;
  }

  static async editEpisode(id, episode) {
    let bodyFormData = new FormData();
    bodyFormData.append('id', id);
    bodyFormData.append('movie', episode);

    const response = await this.request('movie/episode', {
      method: 'PATCH',
      data: bodyFormData,
    });
    return response.data;
  }

  // auth
  static async login(email, password) {
    const {data} = await this.request('admin/auth/login', {
      method: 'POST',
      data: {
        email,
        password,
      },
    });
    return data;
  }

  static buildApiUrl(endpoint) {
    return `${this.BASE_URL}/${endpoint}`;
  }

  static async request(endpoint, config = {}) {
      const extraHeaders = {};
      const currentState = store.getState();
      const authState = currentState.auth;
      if (authState?.isAuth) {
        extraHeaders.authorization = `${authState.access_token}`;
      }


      const response = await axios({
        method: config.method || "GET", // default method
        url: this.buildApiUrl(endpoint),
        ...config,
        headers: {
          ...extraHeaders,
          ...config.headers,
        },
      });

      return response.data;
  }
}
