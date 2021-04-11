import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { Loading, Input } from "../../components/common";
import { getEmployees } from "../../actions/employeeAction";
import { EmployeeList } from "../../components";
import Pagination from 'react-bootstrap/Pagination';
import ListGroup from 'react-bootstrap/ListGroup';
import DepartmentSelectModal from '../modals/department-select-modal';
import CountrySelectModal from '../modals/country-select-modal';
import EmployeeAddModal from '../modals/employee-add-modal';
import Button from "react-bootstrap/Button";

import './style.css';

class Employees extends Component {
  state = {
    currentPage: 1,
    searchFilter: "",
    filterByKey: "",
    filterByValue: "",
    showDepartmentModal: false,
    showCountryModal: false,
    showEmployeeAddModal: false,
    employee: null
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.reloadEmployees();
  }

  handlePaginationItemCLick(idx) {
    this.setState({ currentPage: idx },
      () => { this.reloadEmployees(idx) });
    window.scrollTo(0, 0)
  }

  openDepartmentModal() {
    this.setState({ showDepartmentModal: true });
  }

  openCountryModal() {
    this.setState({ showCountryModal: true });
  }

  openCountryModal() {
    this.setState({ showCountryModal: true });
  }

  handleFilterClick(filterBy) {
    switch (filterBy) {
      case 'department':
        this.openDepartmentModal();
        break;
      case 'country':
        this.openCountryModal();
        break;
      default:
        break;
    }
  }

  handleclearFiltersClick() {
    this.setState({ filterByKey: '', currentPage: 1, filterByValue: null, filterByName: '' },
      () => { this.reloadEmployees(1) });
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 },
      () => { this.reloadEmployees(1) });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  reloadEmployees(page = 1) {
    setTimeout(() => {
      this.props.getEmployees(page, this.state.searchFilter, this.state.filterByValue, this.state.filterByKey);
    });
  }

  onDepSelected(obj) {
    if (obj && obj.depId) {
      this.setState({ filterByKey: 'department', filterByValue: obj.depId, filterByName: obj.depName }, () => {
        this.reloadEmployees()
      });
      this.setState({ showDepartmentModal: false });
    }
  }

  onCounSelected(obj) {
    if (obj) {
      this.setState({ filterByKey: 'country', filterByValue: obj.counId, filterByName: obj.counName }, () => {
        this.reloadEmployees()
      });
      this.setState({ showCountryModal: false });
    }
  }

  onDepModalCancel() {
    this.setState({ showDepartmentModal: false });
  }

  onCounModalCancel() {
    this.setState({ showCountryModal: false });
  }

  onEmployeeAddClick() {
    this.setState({ showEmployeeAddModal: true });
  }

  onAddModalCancel(shouldReload = false) {
    this.setState({
      showEmployeeAddModal: false, currentPage: shouldReload ? 1 : this.state.currentPage,
      employee: null
    }, () => {
      shouldReload ? this.reloadEmployees() : void 0;
    });
  }

  onEmployeeAdd() {
    this.setState({ showEmployeeAddModal: false });
  }

  onEmployeeClick(emp) {
    this.setState({ employee: emp }, () => { this.onEmployeeAddClick() });
  }

  render() {
    const {
      currentPage
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

    // pagination
    let items = [];
    for (let i = 1; i <= Math.ceil(employees.total / employees.pagination.perPage); i++) {
      items.push(
        <Pagination.Item key={i} onClick={() => this.handlePaginationItemCLick(i)}
          active={i === currentPage}>
          {i}
        </Pagination.Item>,
      );
    }

    const paginationBasic = (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );

    return (
      <div className="background-container">
        <div className="mx-5 py-5">
          <div className="row">
            <div className="offset-10 col-lg-2 col-sm-12 margin-bottom-10">
              <Button variant="primary"
                onClick={() => this.onEmployeeAddClick()}>Add Employee</Button>{' '}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-2 col-sm-12">
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  Filters
                </ListGroup.Item>
                <ListGroup.Item className="cursor-pointer" as="li"
                  onClick={() => this.handleFilterClick('department')}>Filter by department</ListGroup.Item>
                <ListGroup.Item className="cursor-pointer" as="li"
                  onClick={() => this.handleFilterClick('country')}>Filter by country</ListGroup.Item>
                {
                  this.state.filterByKey || this.state.filterByValue ?
                    <ListGroup.Item className="cursor-pointer clear-filter" as="li"
                      onClick={() => this.handleclearFiltersClick()}>Clear filters</ListGroup.Item> : null
                }
              </ListGroup>
            </div>

            <div className="col-lg-10 col-sm-12">
              <Input
                onChange={(event) =>
                  this.handleChange("searchFilter", event.target.value)
                }
                label="Search Employees"
                iconClass="fas fa-search"
                placeholder="Search..."
              />
              <p className="text-left text-muted">
                {employees.total + ' '}
                 employees found.
               </p>
              {
                this.state.filterByKey && this.state.filterByValue ?
                  (<p className="text-left text-muted green-bold">
                    {'Employees list is filtered by ' + this.state.filterByKey + ' = ' + this.state.filterByName}
                  </p>)
                  : null
              }

              {
                paginationBasic
              }
              {!!filteredEmployees ? (
                <EmployeeList
                  onEmployeeClick={(emp) => this.onEmployeeClick(emp)}
                  employees={filteredEmployees}
                />
              ) : (
                  <h1 className="text-white">No Employees</h1>
                )}
              <br />
              {
                paginationBasic
              }
            </div>
          </div>
        </div>
        <div>
          {this.state['showDepartmentModal'] ?
            <DepartmentSelectModal
              onDepModalCancel={() => this.onDepModalCancel()}
              onDepSelected={(obj) => this.onDepSelected(obj)} /> : null}
        </div>
        <div>
          {this.state['showCountryModal'] ?
            <CountrySelectModal
              onCounModalCancel={() => this.onCounModalCancel()}
              onCounSelected={(obj) => this.onCounSelected(obj)} /> : null}
        </div>
        <div>
          {this.state['showEmployeeAddModal'] ?
            <EmployeeAddModal
              employee={this.state.employee}
              onAddModalCancel={(shouldReload) => this.onAddModalCancel(shouldReload)} /> : null}
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
    getEmployees: (page, q, filterByValue, filterByKey) =>
      dispatch(getEmployees(page, q, filterByValue, filterByKey)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
