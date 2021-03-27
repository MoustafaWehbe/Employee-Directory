import {
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_ERROR,
    ADD_EMPLOYEE_ERROR,
    ADD_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_ERROR,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_ERROR,
    CLEAR_ADD_RESPONSE,
    UPLOAD_EMPLOYEE_PICTURE_ERROR,
    UPLOAD_EMPLOYEE_PICTURE_SUCCESS
} from "./actionTypes";
import { getAllEmployees, createEmployee, deleteEmployee, updateEmployee, uploadPicture } from '../utils/EmployeeApi'

export const getEmployees = (page, q, filterByValue, filterByKey) => {
    return async (dispatch) => {
        try {
            const result = await getAllEmployees(page, q, filterByValue, filterByKey);
            dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: GET_EMPLOYEES_ERROR, error });
        }
    };
};

export const addEmployee = (emp) => {
    return async (dispatch) => {
        try {
            const result = await createEmployee(emp);
            dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: ADD_EMPLOYEE_ERROR, error });
        }
    };
};

export const UpdateEmployee = (emp) => {
    return async (dispatch) => {
        try {
            const result = await updateEmployee(emp);
            dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: UPDATE_EMPLOYEE_ERROR, error });
        }
    };
};

export const DeleteEmployee = (empId) => {
    return async (dispatch) => {
        try {
            const result = await deleteEmployee(empId);
            dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: DELETE_EMPLOYEE_ERROR, error });
        }
    };
};

export const UploadPicture = (empId, data) => {
    return async (dispatch) => {
        try {
            const result = await uploadPicture(empId, data);
            dispatch({ type: UPLOAD_EMPLOYEE_PICTURE_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: UPLOAD_EMPLOYEE_PICTURE_ERROR, error });
        }
    };
};

export const ClearAddResponse = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_ADD_RESPONSE, payload: null });
    };
};
