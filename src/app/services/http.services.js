import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

axios.defaults.baseURL = config.apiEndPoint;

axios.interceptors.response.use((res) => res, function (error) {
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
