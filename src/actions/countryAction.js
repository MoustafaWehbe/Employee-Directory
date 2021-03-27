import { GET_COUNTRIES_SUCCESS, GET_COUNTRIES_ERROR } from "./actionTypes";
import { getAllCountries } from '../utils/EmployeeApi'

export const getCountries = () => {
    return async (dispatch) => {
        try {
            const result = await getAllCountries();
            dispatch({ type: GET_COUNTRIES_SUCCESS, payload: result.data });
        } catch (error) {
            dispatch({ type: GET_COUNTRIES_ERROR, error });
        }
    };
};

