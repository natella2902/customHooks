import httpService from "./http.services";
const userEndPoint = "user/";

const userServices = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    }
};

export default userServices;
