
import { handleRequest } from '../utils/axios';


export const createCateJobAPI = async (data) => {
    const config = {
        url: '/catejob/create',
        method: 'POST',
        data
    };

    return handleRequest(config);
};

export const updateCateJobAPI = async (data) => {
    console.log("data: ", data);
    // const {id,user,role,enabled} = data;
    // console.log(user)
    const config = {
        url: '/catejob/update',
        method: 'PUT',
        data
    };

    return handleRequest(config);
};

export const deleteCateJobAPI = async (id) => {
    const config = {
        url: `/catejob/delete/${id}`,
        method: 'DELETE'
    };
    return handleRequest(config);
};

export const getCateJobListAPI = async () => {
    const config = {
        url: '/catejob/list',
        method: 'GET'
    };

    return handleRequest(config);
};


