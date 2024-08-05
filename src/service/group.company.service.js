
import { handleRequest } from '../utils/axios';


export const createCompanyAPI = async (data) => {
    const config = {
        url: '/company/create',
        method: 'POST',
        data
    };

    return handleRequest(config);
};

export const updateCompanyAPI = async (data) => {
    console.log("data: ", data);
    // const {id,user,role,enabled} = data;
    // console.log(user)
    const config = {
        url: '/company/update',
        method: 'PUT',
        data
    };

    return handleRequest(config);
};

export const deleteCompanyAPI = async (id) => {
    const config = {
        url: `/company/delete/${id}`,
        method: 'DELETE'
    };
    return handleRequest(config);
};

export const getCompanyByIdAPI = async (id) => {
    const config = {
        url: `/company/${id}`,
        method: 'GET'
    };
    return handleRequest(config);
};

export const getCompanyListAPI = async () => {
    const config = {
        url: '/company/list',
        method: 'GET'
    };

    return handleRequest(config);
};


export const searchCompanyByNameAPI = async (name) => {
    const config = {
        url: '/company/searchname?name=' + name,
        method: 'POST'
    };
    return handleRequest(config);
};

export const searchCompanyByAddressAPI = async (address) => {
    const config = {
        url: '/company/searchaddress?address=' + address,
        method: 'POST'
    };
    return handleRequest(config);
};
