import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import professionServices from "./../services/profession.services";
import { toast } from "react-toastify";

const ProfessionContext = React.createContext();

export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessionsList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getProfessionsList() {
        try {
            const { content } = await professionServices.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            catcherErrors(error);
        }
    }
    function getProfession(id) {
        return professions.find(prof => prof._id === id);
    }
    function catcherErrors(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }

    return (
        <ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
