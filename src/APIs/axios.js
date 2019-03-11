import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://yanyuchengxi.firebaseapp.com'
    

});



// instance.interceptors.request...

export default instance;