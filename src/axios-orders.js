import Axios from 'axios';

const instance = Axios.create({
  baseURL: 'https://react-burger-builder-ed482.firebaseio.com/'
});

export default instance;