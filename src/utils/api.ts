import axios from "axios";


let baseURL = "http://localhost:5000";

if (process.env.NODE_ENV === 'production') {
    baseURL = "https://cloud-backend-eics.onrender.com/";
}
const api = axios.create({
    baseURL,
})
api.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('authorization');
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;