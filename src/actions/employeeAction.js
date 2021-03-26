import Axios from "axios";
import { GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from "./actionTypes";
import { getAllEmployees } from '../utils/EmployeeApi'

export const getEmployees = () => {
    return async (dispatch) => {
        try {
            const result = await getAllEmployees();
            dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: GET_EMPLOYEES_ERROR, error });
        }
    };
};

