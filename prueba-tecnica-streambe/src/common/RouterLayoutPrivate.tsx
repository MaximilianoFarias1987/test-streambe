
import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "./NavBar"
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';


export const RouterLayoutPrivate: React.FC<{}> = () => {

    const {logged} = useContext(AuthContext);

    return (logged) ? (
        <>
            <NavBar/>
            <Outlet/>
        </>
    ) : <Navigate to='/login'/>
}