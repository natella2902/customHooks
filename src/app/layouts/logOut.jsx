import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOut } = useAuth();
    useEffect(() => { logOut(); }, []);
    return <h2>Log Out</h2>;
};

export default LogOut;
