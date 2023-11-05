import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://purple-earthworm-sock.cyclic.app/api/v1',
});

export default instance;
