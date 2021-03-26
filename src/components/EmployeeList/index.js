import React from "react";

import EmployeeCard from "./EmployeeCard";
import "./style.css";

export default function EmployeeList({ employees }) {
    return (
        <div className="employees-grid">
            {!!employees &&
                employees.map((employee) => (
                    <EmployeeCard employee={employee} key={employee._id} />
                ))}

        </div>
    );
}

