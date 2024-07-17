import { Component, lazy, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";


const Loadable = (Component) => (props) => {
    
    const {pathname} = useLocation();

    return (
        <Suspense >
            <Component {...props}/>
        </Suspense>
    )
}

//AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

export default function Router(){
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login/>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Register/>
                        </GuestGuard>
                    ),
                },
                {path: 'login-unprotected', element: <Login/>},
                {path: 'register-unprotected', element: <Register/>},
                {path: 'reset-password', element: <Login/>},
                {path: 'verify', element: <VerifyCode/>},
            ],
        },
        //dashboard router
        {
            path: 'dashboard',
            element: (
                <AuthGuard>
                    
                </AuthGuard>
            ),
            children: [
                {element: <Navigate to = {PATH_AFTER_LOGIN} replace/>, index: true},
                {path: 'analytics', element:<GeneralAnalytics/> },
                {
                    path: 'user',
                    element: (
                        <GuestGuard>
                            <Register/>
                        </GuestGuard>
                    ),
                },
                {path: 'login-unprotected', element: <Login/>},
                {path: 'register-unprotected', element: <Register/>},
                {path: 'reset-password', element: <ResetPassword/>},
                {path: 'verify', element: <VerifyCode/>},
            ],
        }
    ])
}