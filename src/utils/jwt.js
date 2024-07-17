
import { jwtDecode } from "jwt-decode"
import axios from "./axios";

//kiem tra tinh hop le cua token con hieu luc khong
const isValidToken = (token) => {
    const decode = jwtDecode(token.token);
    console.log("decode ", JSON.stringify(decode));

    const currentTime = Date.now() / 1000;
    console.log("current time ", JSON.stringify(currentTime));

    return decode.exp > currentTime;
}
// luu tru ma thong bao va thiet lap header cho auth
const setSession = (accessToken) => {
    if(accessToken){
        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    }else{
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization;
    }
}
//lay ma trong local
const getSession = () => {
    console.log('get accessToken');
    console.log(localStorage.getItem('accessToken'))
    return JSON.parse(localStorage.getItem('accessToken'));
};
export {isValidToken, setSession, getSession}