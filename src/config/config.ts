class Config {
  public readonly apiService: { api: string };

  constructor() {
    this.apiService = {
      api: 'http://pb-api.herokuapp.com',
    };
  }
}

export default new Config();
