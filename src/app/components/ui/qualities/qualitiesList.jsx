import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualitiesListFilter } = useQuality();
    if (!isLoading) {
        return (
            <>
                {getQualitiesListFilter(qualities).map((qual) => (
                    <Quality key={qual._id} {...qual} />
                    ))}
            </>
        );
    } else {
        return (<p>Loading...</p>);
    };
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
