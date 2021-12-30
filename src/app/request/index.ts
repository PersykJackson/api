import axios from 'axios';

const request = {
  get: (url: string) => axios.get(url),
};

export default request;
