import axios from 'axios';

const api = process.env.API_URL || 'http://localhost:4000/api/v1';

const config = {
    'Content-Type': 'application/json',
};

// var config2 = {
//     'Content-Type': 'multipart/form-data',
// }

export const getAllEmployees = () => {
    return axios.get(`${api}/employee`, config)
}

export const deleteContact = (empId) => {
    return axios.delete(`${api}/employee/${empId}`, config)
}

export const updateEmployee = (emp) => {
    return axios.post(`${api}/employee`, emp, config);
}

export const createEmployee = (emp) => {
    return axios.post(`${api}/employee`, emp, config)
}

export const getDepartments = () => {
    return axios.get(`${api}/department`, config)
}

export const getCountries = () => {
    return axios.get(`${api}/country`, config)
}

// export const upload = (data, id) => {
//     console.log(data);
//     return axios.post(`${api}/upload/${id}`, data, config2);
// }