import httpService from "./http.services";
const professionEndPoint = "profession/";

const professionServices = {
    get: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};

export default professionServices;
