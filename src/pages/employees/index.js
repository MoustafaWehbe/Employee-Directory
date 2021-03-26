import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { Loading } from "../../components/common";

import { getEmployees } from "../../actions/employeeAction";
import { EmployeeList } from "../../components";

class Employees extends Component {
  state = {
    currentPage: 1,
    searchFilter: "",
  };

  componentDidMount() {
    this.props.getEmployees();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      currentPage,
      searchFilter,
    } = this.state;

    const { employees } = this.props;

    if (_.isEmpty(employees)) {
      return (
        <div className="background-container pt-5">
          <Loading />
        </div>
      );
    }

    let filteredEmployees = employees.employees;

    return (
      <div className="background-container">
        <div className="mx-5 py-5">
          <div className="row">
            <div className="col-lg-2 col-sm-12">
              <h4 className="text-muted text-left p-1">Filters</h4>
            </div>

            <div className="col-lg-10 col-sm-12">
              {/* <Input
                onChange={(event) =>
                  this.handleChange("searchFilter", event.target.value)
                }
                label="Search Employees"
                iconClass="fas fa-search"
                placeholder="Search..."
              /> */}
              <p className="text-left text-muted">
                {!!filteredEmployees.length ? `${filteredEmployees.length}` : "0"}
                 employees found.
               </p>

              {!!filteredEmployees ? (
                <EmployeeList
                  employees={filteredEmployees}
                />
              ) : (
                  <h1 className="text-white">No Employees</h1>
                )}
              <br />

              {/* <Pagination
                itemsCount={filteredEmployees.length}
                pageSize={pageSize}
                onPageChange={this.onPageChange}
                currentPage={currentPage}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employee.employees,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEmployees: () => dispatch(getEmployees()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
