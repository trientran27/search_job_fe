import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

export default function AuthGuard({children}){
    const {isAuthenticated} = useAuth();
    const {pathname} = useLocation();

    const [requestedLocation, setRequestedLocation] = useState(null);

    if(isAuthenticated){
        if(pathname !== requestedLocation){
            setRequestedLocation(pathname)
        }
        return <Login/>
    }
    if(requestedLocation && pathname !== requestedLocation){
        setRequestedLocation(null);
        return <Navigate to = {requestedLocation} />
    }
    return <>{children}</>
}