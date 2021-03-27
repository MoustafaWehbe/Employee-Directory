import { GET_DEPARTMENTS_SUCCESS, GET_DEPARTMENTS_ERROR } from "./actionTypes";
import { getAllDepartments } from '../utils/EmployeeApi'

export const getDepartments = () => {
    return async (dispatch) => {
        try {
            const result = await getAllDepartments();
            dispatch({ type: GET_DEPARTMENTS_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: GET_DEPARTMENTS_ERROR, error });
        }
    };
};

