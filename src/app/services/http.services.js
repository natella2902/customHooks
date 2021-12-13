import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config";

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.defaults.baseURL = configFile.apiEndPoint;

http.interceptors.request.use(
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

// function transformData(data) {
//     return data ? Object.keys(data).map(key => ({
//         ...data[key]
//     })) : [];
// }

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
};

http.interceptors.response.use((res) => {
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
    };
    return Promise.reject(error);
});

const httpService = {
    get: http.get,
    put: http.put,
    post: http.post,
    delete: http.delete
};

export default httpService;
