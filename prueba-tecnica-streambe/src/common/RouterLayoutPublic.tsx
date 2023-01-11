import { Navigate, Outlet } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';


export const RouterLayoutPublic: React.FC<{}> = () => {

    const {logged} = useContext(AuthContext);

    return (!logged) ? (
        <>
            <Outlet/>
        </>
    ) : <Navigate to='/'/>
}