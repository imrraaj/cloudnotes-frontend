import axios from "axios";
const api = axios.create({
    baseURL: "https://cloud-backend-eics.onrender.com/",
})
api.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('authorization');
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default api;