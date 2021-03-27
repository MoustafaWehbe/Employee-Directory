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

import './style.css';

const perPage = 10;

class Employees extends Component {
  state = {
    currentPage: 1,
    searchFilter: "",
    filterByKey: "",
    filterByValue: "",
    showDepartmentModal: false,
    showCountryModal: false
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
    this.setState({ filterByKey: '', filterByValue: null },
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
    this.props.getEmployees(page, this.state.searchFilter, this.state.filterByValue, this.state.filterByKey);
  }

  onDepSelected(id) {
    if (id) {
      this.setState({ filterByKey: 'department', filterByValue: id }, () => {
        this.reloadEmployees()
      });
      this.setState({ showDepartmentModal: false });
    }
  }

  onCounSelected(id) {
    if (id) {
      this.setState({ filterByKey: 'country', filterByValue: id }, () => {
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

    // pagination
    let items = [];
    for (let i = 1; i <= employees.total / perPage; i++) {
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
            <div className="col-lg-2 col-sm-12">
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  Filters
                </ListGroup.Item>
                <ListGroup.Item className="cursor-pointer" as="li"
                  onClick={() => this.handleFilterClick('department')}>Filter by department</ListGroup.Item>
                <ListGroup.Item className="cursor-pointer" as="li"
                  onClick={() => this.handleFilterClick('country')}>Filter by country</ListGroup.Item>
                <ListGroup.Item className="cursor-pointer clear-filter" as="li"
                  onClick={() => this.handleclearFiltersClick()}>Clear filters</ListGroup.Item>
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
                {!!filteredEmployees.length ? `${filteredEmployees.length} ` : "0"}
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
              onDepSelected={(id) => this.onDepSelected(id)} /> : null}
        </div>
        <div>
          {this.state['showCountryModal'] ?
            <CountrySelectModal
              onCounModalCancel={() => this.onCounModalCancel()}
              onCounSelected={(id) => this.onCounSelected(id)} /> : null}
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
