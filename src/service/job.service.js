
import { handleRequest } from '../utils/axios';


export const createJobAPI = async (data) => {
    const config = {
        url: '/job/create',
        method: 'POST',
        data
    };

    return handleRequest(config);
};

export const updateJobAPI = async (data) => {
    console.log("data: ", data);
    // const {id,user,role,enabled} = data;
    // console.log(user)
    const config = {
        url: '/job/update',
        method: 'PUT',
        data
    };

    return handleRequest(config);
};

export const deleteJobAPI = async (id) => {
    const config = {
        url: `/job/delete/${id}`,
        method: 'DELETE'
    };
    return handleRequest(config);
};

export const getJobByIdAPI = async (id) => {
    const config = {
        url: `/job/${id}`,
        method: 'GET'
    };
    return handleRequest(config);
};

export const getJobListAPI = async () => {
    const config = {
        url: '/job/list',
        method: 'GET'
    };

    return handleRequest(config);
};


export const searchJobByCompanyAPI = async (id) => {
    const config = {
        url: `/job/searchcompany/${id}`,
        method: 'POST'
    };
    return handleRequest(config);
};

export const searchJobByMajorAPI = async (major) => {
    const config = {
        url: '/job/searchmajor?major=' + major,
        method: 'POST'
    };
    return handleRequest(config);
};

export const searchJobByCateJobAPI = async (name) => {
    const config = {
        url: '/job/searchcate?name=' + name,
        method: 'POST'
    };
    return handleRequest(config);
};