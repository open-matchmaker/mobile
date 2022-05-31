import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://matchmaker-node.herokuapp.com/',
});

export default instance