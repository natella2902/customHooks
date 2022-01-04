import httpService from "./http.services";
import localStorageService from "./localStorage.services";
const userEndPoint = "user/";

const userServices = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndPoint + payload._id, payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.put(userEndPoint + payload._id, payload);
        console.log("w", data);
        return data;
    },
   getCurrentUser: async () => {
        const { data } = await httpService.get(userEndPoint + localStorageService.getUserById());
        return data;
    }
};

export default userServices;
