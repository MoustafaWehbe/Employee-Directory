import axios from 'axios';

const api = process.env.API_URL || 'http://localhost:4000/api/v1';

const config = {
    'Content-Type': 'application/json',
};

var config2 = {
    'Content-Type': 'multipart/form-data',
}

export const getAllEmployees = (page, q, filterByValue, filterByKey) => {
    let paramsText = "";
    let params = [];
    if (page) {
        params.push("page=" + page);
    }
    else {
        params.push("page=" + 1);
    }
    if (q) {
        params.push("q=" + q);
    }
    if (filterByValue) {
        params.push("filterByValue=" + filterByValue);
    }
    if (filterByKey) {
        params.push("filterByKey=" + filterByKey);
    }
    paramsText = "?" + params.join("&");

    return axios.get(`${api}/employee${paramsText}`, config)
}

export const deleteEmployee = (empId) => {
    return axios.delete(`${api}/employee/${empId}`, config)
}

export const updateEmployee = (emp) => {
    return axios.put(`${api}/employee/${emp._id}`, emp, config);
}

export const createEmployee = (emp) => {
    return axios.post(`${api}/employee`, emp, config)
}

export const getAllDepartments = () => {
    return axios.get(`${api}/department`, config)
}

export const getAllCountries = () => {
    return axios.get(`${api}/country`, config)
}

export const uploadPicture = (empId, data) => {
    return axios.post(`${api}/employee/photo/${empId}`, data, config2)
}
