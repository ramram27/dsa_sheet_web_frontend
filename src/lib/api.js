import axios from "axios";

const api = axios.create({
    baseURL: "http://35.154.192.32:5000/api",
});

api.interceptors.request.use((config) => {
    const token =
        typeof window !== "undefined"
            ? localStorage.getItem("token")
            : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
