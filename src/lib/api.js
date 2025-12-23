import axios from "axios";

const api = axios.create({
    baseURL: "http://13.233.67.166/api",
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
