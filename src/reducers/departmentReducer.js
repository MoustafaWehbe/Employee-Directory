import { GET_DEPARTMENTS_SUCCESS, GET_DEPARTMENTS_ERROR } from "../actions/actionTypes.js";

const initialState = {
    departments: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.payload,
            };

        case GET_DEPARTMENTS_ERROR:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}
