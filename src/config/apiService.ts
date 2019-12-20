import axios from 'axios';
import config from './config';

const API = config.apiService.api;

interface IRes {
  bars: number[];
  buttons: number[];
  limit: number;
}

export default class ApiService {
  static getData = (): Promise<IRes> =>
    axios
      .get(`${API}/bars`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(res => res.data);
}
