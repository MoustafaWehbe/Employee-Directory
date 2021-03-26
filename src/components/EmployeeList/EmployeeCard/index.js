import React from "react";
import "./style.css";

const EmployeeCard = ({
    employee,
}) => {
    return (
        <div className="front">
            <img src={employee.coverImage} alt="coverImage" />
            <div className="card-footer">
                <h4> {employee.firstName + ' ' + employee.lastName}  </h4>
                <p>
                    {employee.email}
                </p>
            </div>
        </div>
    );
};
export default EmployeeCard;

