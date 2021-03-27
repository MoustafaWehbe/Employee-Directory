import {
    GET_EMPLOYEES_SUCCESS,
    GET_EMPLOYEES_ERROR,
    ADD_EMPLOYEE_ERROR,
    CLEAR_ADD_RESPONSE,
    ADD_EMPLOYEE_SUCCESS
} from "../actions/actionTypes.js";

const initialState = {
    employees: [],
    employee: {},
    addResponse: null,
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
        case ADD_EMPLOYEE_SUCCESS:
            return {
                ...state,
                employee: action.payload,
            };

        case ADD_EMPLOYEE_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case CLEAR_ADD_RESPONSE:
            return {
                ...state,
                employee: {}
            }

        default:
            return state;
    }
}
