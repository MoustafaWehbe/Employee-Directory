import { GET_COUNTRIES_ERROR, GET_COUNTRIES_SUCCESS } from "../actions/actionTypes.js";

const initialState = {
    countries: [],
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                countries: action.payload,
            };

        case GET_COUNTRIES_ERROR:
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
}
