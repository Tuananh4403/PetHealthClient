import axios from "axios";
import { getToken } from "../utils/auth";
import { SYS_API_URL } from "../constants/global";

export default axios.create({
    baseURL: SYS_API_URL,
});
export const axiosPrivate = axios.create({
    baseURL: SYS_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosPrivate.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
