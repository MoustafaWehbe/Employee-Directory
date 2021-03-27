import { combineReducers } from "redux";
import employeeReducer from "./employeeReducer";
import departmentReducer from "./departmentReducer";
import countryReducer from "./countryReducer";

export default combineReducers({
    employee: employeeReducer,
    department: departmentReducer,
    country: countryReducer
});
