import React, { useProfession } from "../../hooks/useProfession";
import propTypes from "prop-types";
const Profession = ({ id }) => {
    const { getProfession, isLoading } = useProfession();
    const prof = getProfession(id);
    if (!isLoading) {
        return <p> { prof.name } </p>;
    } else {
        return "Loading ...";
    }
};

Profession.propTypes = {
    id: propTypes.string
};

export default Profession;
