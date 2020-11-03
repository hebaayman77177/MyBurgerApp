import axios from 'axios';

const instance = axios.create({
    baseURL:"https://my-burger-app-40660.firebaseio.com/"
});

export default instance;