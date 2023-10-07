import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useLogin } from './LoginProvider';

const RequiredAuth: React.FC<{children: any}> = ({children}) => {

    const auth = useLogin();

    const location = useLocation();
    
    if(!auth.user.isLogged && location.pathname!=="/login"){
        return <Navigate to="/login"/>
    }

    return children

  
}

export default RequiredAuth