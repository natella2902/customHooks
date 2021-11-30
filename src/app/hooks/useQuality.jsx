import React, { useContext, useEffect, useState } from "react";
import qualityService from "./../services/quality.services";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const QualityContext = React.createContext();

export const useQuality = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
       getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);
    async function getQualitiesList() {
        try {
          const { content } = await qualityService.get();
            setQualities(content);
            setIsLoading(false);
        } catch (error) {
            catcherErrors(error);
        }
    }
    function getQualitiesListFilter(items) {
        const arr = [];
        for (let i = 0; i < items.length; i++) {
            const res = qualities.filter((qual) => qual._id === items[i]);
            arr.push(...res);
        }
        return arr;
    }
    function catcherErrors(error) {
        const { message } = error.response.data;
        setError(message);
        setIsLoading(false);
    }
    return (
        <QualityContext.Provider value={{ isLoading, qualities, getQualitiesListFilter }}>
            {children}
       </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
