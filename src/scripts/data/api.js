import axios from 'axios';

export default class Api {
  constructor() {
    this._instance = axios.create({ baseURL: 'https://opentdb.com' });
  }

  async sessionToken() {
    return this._instance.get('/api_token.php', {
      params: { command: 'request' },
    })
      .then((response) => response.data.token)
      .catch((error) => console.error(error));
  }

  async categories() {
    return this._instance.get('/api_category.php')
      .then((response) => response.data.trivia_categories)
      .catch((error) => console.error(error));
  }

  async questions(token, category, amount = 10) {
    return this._instance.get('/api.php', {
      params: {
        token,
        category,
        amount,
        type: 'multiple',
      },
    })
      .then((response) => response.data.results)
      .catch((error) => console.error(error));
  }
}
