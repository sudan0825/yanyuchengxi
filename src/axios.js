import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://yanyuchengxi.firebaseio.com/'
    

});



// instance.interceptors.request...

export default instance;