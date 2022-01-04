import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import userServices from "../services/user.services";
import { toast } from "react-toastify";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function getUsers() {
        try {
            const { content } = await userServices.get();
            setUsers(content);
            setIsLoading(false);
        } catch (error) {
            catcherErrors(error);
        }
    };
    function catcherErrors(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    function getUserById(userId) {
        return users.find((user) => user._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            { !isLoading ? children : "Loading ..." }
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};

export default UserProvider;
