import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config";

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
         const containSlash = /\/$/gi.test(config.url);
         config.url = (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
    return Promise.reject(error);
    }
);

function transformData(data) {
    return data ? Object.keys(data).map(key => ({
        ...data[key]
    })) : [];
}

axios.interceptors.response.use((res) => {
        console.log(res.data);
        if (configFile.isFirebase) {
           res.data = { content: transformData(res.data) };
        }
        return res;
    },
    function (error) {
    const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
    if (!expectedErrors) {
        toast("unExpectedErrors");
        toast.error("Something was wrong. Try it letter");
        console.log(error);
    };
    return Promise.reject(error);
});

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
};

export default httpService;
