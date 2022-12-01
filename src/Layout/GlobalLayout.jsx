import NavBar from "../Components/NavBar";
import { Outlet } from "react-router";
import { useAuth } from "../Hooks/auth";
import { useEffect, useState } from "react";


const GlobalLayout = (props) => {

    const {urlEndpoint, user } = props

    const auth = useAuth()
    

    return (
        <div className="global-layout">
            <NavBar urlEndpoint={urlEndpoint} user={user} />
            <Outlet />
        </div>
    )
}

export default GlobalLayout;