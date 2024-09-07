import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL || "",
    headers: {
        "Content-Type": "application/json",
        "api-token": process.env.EXPO_PUBLIC_API_TOKEN || "",
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        // console.log("Request", config.data);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { api };
