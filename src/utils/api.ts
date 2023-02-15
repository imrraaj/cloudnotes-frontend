import axios from "axios";

export default axios.create({
    baseURL: "https://cloud-backend-eics.onrender.com/",
    headers: {
        Authorization: localStorage.getItem('authorization'),
    }
})