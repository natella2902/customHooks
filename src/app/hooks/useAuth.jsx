import React, { useContext, useEffect, useState } from "react";
import propTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import userServices from "../services/user.services";
import { setTokens } from "../services/localStorage.services";

const httpAuth = axios.create();
const AuthContext = React.createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({});
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            catcherErrors(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким email существует"
                    };
                    throw errorObject;
                };
            }
        };
    };

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await axios.post(url, { email, password, returnSecureToken: true });
            setTokens(data);
        } catch (error) {
            catcherErrors(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Введен неверный пароль"
                    };
                    throw errorObject;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Email не зарегистрирован в системе"
                    };
                    throw errorObject;
                }
            }
        };
    }

    async function createUser(data) {
        try {
            const { content } = await userServices.create(data);
            setUser(content);
        } catch (error) {
            catcherErrors(error);
        }
    };

    function catcherErrors(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
            { children }
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: propTypes.oneOfType([propTypes.arrayOf(propTypes.node), propTypes.node])
};
