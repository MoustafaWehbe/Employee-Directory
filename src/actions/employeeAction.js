import {
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_ERROR,
    ADD_EMPLOYEE_ERROR,
    ADD_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_SUCCESS,
    UPDATE_EMPLOYEE_ERROR,
    DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_ERROR,
    CLEAR_ADD_RESPONSE
} from "./actionTypes";
import { getAllEmployees, createEmployee, deleteEmployee, updateEmployee } from '../utils/EmployeeApi'

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

export const UpdateEmployee = (emp, emp_id) => {
    return async (dispatch) => {
        try {
            const result = await updateEmployee(emp, emp_id);
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

export const ClearAddResponse = () => {
    return (dispatch) => {
        dispatch({ type: CLEAR_ADD_RESPONSE, payload: null });
    };
};
