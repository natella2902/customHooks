import httpService from "./http.services";
const userEndPoint = "user/";

const userServices = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(userEndPoint + payload._id, payload);
        return data;
    }
};

export default userServices;
