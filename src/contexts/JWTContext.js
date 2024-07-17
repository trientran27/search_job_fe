import { createContext, useEffect, useReducer } from "react";
import { isValidToken, setSession } from "../utils/jwt";
import PropTypes from 'prop-types'

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    user : null,
};

//tao context
const AuthContext = createContext({
    ...initialState,
    method: 'jwt',
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve(),
});

AuthProvider.propTypers = {
    children: PropTypes.node,
    
}
//dispath : goi toi ham
// payload: gia tri dau vao

function AuthProvider({children}){
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect (() => {
        const initialize = async () => {
            try {
                const accessToken = JSON.parse(window.localStorage.getItem("accessToken") || null);
                console.log("acc token use eff", JSON.stringify(accessToken));
                if(accessToken !== null){
                    if(isValidToken(accessToken)){
                        setSession(accessToken);

                        const user = accessToken;

                        dispatch({
                            type: 'INITIALIZE',
                            payload: {
                                isAuthenticated: true,
                                user,
                            },
                        });
                    }else{
                        localStorage.removeItem("accessToken");
                        dispatch({
                            type: 'INITIALIZE',
                            payload: {
                                isAuthenticated: false,
                                user: null,
                            },
                        });
                    }
                }else{
                    dispatch({
                        type: 'INITIALIZE',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (error) {
                console.error(error)

                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };
        initialize();
    }, []);

    const login = async (username, password) => {
        const response = await axios.post('/api/login', {
          username,
          password,
        });
        console.log("resp : ",JSON.stringify(response.data));
        const accessToken = response.data;
        console.log("acc token: ",JSON.stringify(accessToken));
        setSession(accessToken);
        dispatch({
          type: 'LOGIN',
          payload: {
            accessToken,
          },
        });
      };
    
    const register = async (email, password, firstName, lastName) => {
        const response = await axios.post('/api/account/register', {
          email,
          password,
          firstName,
          lastName,
        });
        const { accessToken, user } = response.data;
    
        window.localStorage.setItem('accessToken', accessToken);
        dispatch({
          type: 'REGISTER',
          payload: {
            user,
          },
        });
    };
    
    const logout = async () => {
        setSession(null);
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider
        value={{
            ...state,
            method: 'jwt',
            login,
            logout,
            register,
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export {AuthContext, AuthProvider}