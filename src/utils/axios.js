import axios from 'axios';
import NProgress from 'nprogress';

//config
import { HOST_API } from '../config';
import axios from 'axios';
import nProgress from 'nprogress';

const axiosInstance = axios.create({
    baseURL: HOST_API,
    timeout: 0,
})


const addBearerToken = async (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"))
    console.log("get access token: ",JSON.stringify(accessToken))
    if((accessToken !== null)){
        console.log("ham null")
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${accessToken.token}`
        }
    }else{
        console.log("ham khong null")
        config.headers = {
            ...config.headers
        }
    }
    NProgress.start();
    console.log("config ", JSON.stringify(config));
    return config;
}



const handleResponse = async response => {
    NProgress.done();
    return response
}

axiosInstance.interceptors.request.use(addBearerToken)//gui len
axiosInstance.interceptors.response.use(handleResponse, 
    async(error) => {
        nProgress.done();
        throw error;
    });

export const handleRequest = async(config) => {
    try{
        console.log("config handle request", JSON.stringify(config))
        const resp = await axiosInstance(config);
        return resp.data;
    }catch (error){
        console.log(error);
        if (error.response){
            return (error.response.data);
        }
        
        return ({ code: "408", message: error.message });
    }
}

export default axiosInstance