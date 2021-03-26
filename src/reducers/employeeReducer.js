import { GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from "../actions/actionTypes.js";

const initialState = {
    employees: [],
    employee: {},
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEES_SUCCESS:
            return {
                ...state,
                employees: action.payload,
            };

        case GET_EMPLOYEES_ERROR:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}
