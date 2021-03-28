import React, { Component, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { Loading } from "../../components/common";

import { connect } from "react-redux";
import _ from "lodash";
import { getDepartments } from "../../actions/departmentAction";
import { getCountries } from "../../actions/countryAction";
import {
    addEmployee,
    DeleteEmployee,
    UpdateEmployee,
    ClearAddResponse,
    UploadPicture
} from "../../actions/employeeAction";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class EmployeeAddModal extends Component {
    state = {
        departments: [],
        countries: [],
        employee: {},
        selectedDepId: null,
        selectedCounId: null,
        addResponse: null,
        selectedCounName: '',
        selectedDepName: '',
        updateMode: false,
        photo: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.employee) {
            this.initUpdateMode();
        }
        else {
            this.initAddMode();
        }
        this.getDeps();
        this.getCountries();
    }

    initUpdateMode() {
        this.setState({
            employee: { ...this.props.employee, birthDate: new Date(this.props.employee.birthDate) },
            updateMode: true,
            selectedCounName: this.props.employee.country.name,
            selectedDepName: this.props.employee.department.name,
            selectedCounId: this.props.employee.country._id,
            selectedDepId: this.props.employee.department._id
        });
    }

    initAddMode() {
        this.state.employee.birthDate = new Date();
        this.setState({ employee: this.state.employee, updateMode: false })
    }

    getDeps() {
        this.props.dispatch(getDepartments())
    }

    getCountries() {
        this.props.dispatch(getCountries())
    }

    handleDepartmentDropdownItemCLick(depId, name) {
        this.state.selectedDepName = name;
        this.state.employee.department = depId;
        this.setState({ employee: this.state.employee });
    }

    handleCountryDropdownItemCLick(counId, name) {
        this.state.employee.country = counId;
        this.state.selectedCounName = name;
        this.setState({ employee: this.state.employee });
    }

    handleBirthDateChange(date) {
        this.state.employee.birthDate = date;
        this.setState({ employee: this.state.employee });
    }

    onAddModalCancel(reloadData = false) {
        this.props.onAddModalCancel(reloadData);
        this.props.dispatch(ClearAddResponse());
    }

    async handleSubmit() {
        if (this.state.updateMode) {
            await this.props.dispatch(UpdateEmployee(this.state.employee));
        }
        else {
            await this.props.dispatch(addEmployee(this.state.employee));
        }
        if (this.state.photo) {
            const formData = new FormData();
            formData.append('myfile', this.state.photo);
            await this.props.dispatch(UploadPicture(this.state.employee._id, formData));
        }
        if (this.props.addResponse && this.props.addResponse.error
            && this.props.addResponse.error.errors) {

        }
        else {
            this.onAddModalCancel(true);
        }
    }

    handleFormItemChange({ currentTarget: input }, name) {
        this.state.employee[name] = input.value;
        this.setState({ employee: this.state.employee })
    }

    onDeleteClicked() {
        if (window.confirm('Are you sure you want to delete the selected employee?')) {
            this.props.dispatch(DeleteEmployee(this.state.employee._id));
            this.onAddModalCancel(true);
        }
    }

    handleFileChange(e) {
        this.setState({ photo: e.target.files[0] })
    }

    render() {
        let validationErrors = [];
        if (this.props.addResponse && this.props.addResponse.error
            && this.props.addResponse.error.errors) {
            for (const err in this.props.addResponse.error.errors) {
                validationErrors.push(
                    <p key={err} className="red">
                        {this.props.addResponse.error.errors[err]['message']}
                    </p>);
            }
        }
        const { departments, countries } = this.props;
        if (_.isEmpty(departments) || _.isEmpty(countries)) {
            return (
                <div className="background-container pt-5">
                    <Loading />
                </div>
            );
        }

        let depItems = [];
        for (let i = 0; departments && i < departments.length; i++) {
            depItems.push(
                <Dropdown.Item key={i} onClick={() => this.handleDepartmentDropdownItemCLick(departments[i]._id, departments[i].name)}>
                    {departments[i].name}
                </Dropdown.Item>
            );
        }
        const depItemsDropDown = (
            <Dropdown.Menu>
                {depItems}
            </Dropdown.Menu>
        );

        let counItems = [];
        for (let i = 0; countries && i < countries.length; i++) {
            counItems.push(
                <Dropdown.Item key={i} onClick={() => this.handleCountryDropdownItemCLick(countries[i]._id, countries[i].name)}>
                    {countries[i].name}
                </Dropdown.Item>
            );
        }
        const counItemsDropDown = (
            <Dropdown.Menu>
                {counItems}
            </Dropdown.Menu>
        );

        const validations = validationErrors ? (
            <div>
                {validationErrors}
            </div>
        ) : null;

        return (
            <Modal show={true}>
                <Modal.Header>Add New Employee</Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Row>
                            <Form.Group controlId="formFirstName">
                                <Form.Label>First name</Form.Label>
                                <Form.Control value={this.state.employee['firstName'] || ''} onChange={(event) => this.handleFormItemChange(event, 'firstName')} type="text" placeholder="Enter first name" />
                            </Form.Group>
                            <Form.Group className="margin-left-7" controlId="formLastName">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control value={this.state.employee['lastName'] || ''} onChange={event => this.handleFormItemChange(event, 'lastName')} type="text" placeholder="Enter last name" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={this.state.employee['email'] || ''} onChange={event => this.handleFormItemChange(event, 'email')} type="email" placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="margin-left-7" controlId="formPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control value={this.state.employee['phone'] || ''} onChange={event => this.handleFormItemChange(event, 'phone')} type="tel" placeholder="Enter phone number" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={this.state.employee['address'] || ''} onChange={event => this.handleFormItemChange(event, 'address')} placeholder="1234 Main St" />
                        </Form.Group>
                        <Form.Group controlId="formWebsite">
                            <Form.Label>Website</Form.Label>
                            <Form.Control value={this.state.employee['website'] || ''} onChange={event => this.handleFormItemChange(event, 'website')} placeholder="Enter your website link" />
                        </Form.Group>
                        <Form.Group controlId="formBirthDate">
                            <Form.Label>Birth date</Form.Label>
                            <DatePicker className="margin-left-7" selected={this.state.employee.birthDate} onChange={date => this.handleBirthDateChange(date)} />
                        </Form.Group>
                    </Form>
                    <Dropdown className="inline-block">
                        <Dropdown.Toggle id="dropdown-dep">
                            {this.state.selectedDepName || 'Select Department'}
                        </Dropdown.Toggle>
                        {depItemsDropDown}
                    </Dropdown>
                    <Dropdown className="inline-block margin-left-7">
                        <Dropdown.Toggle id="dropdown-country">
                            {this.state.selectedCounName || 'Select Country'}
                        </Dropdown.Toggle>
                        {counItemsDropDown}
                    </Dropdown>
                    <Form.Group>
                        <Form.File name="test" onChange={event => this.handleFileChange(event)} id="profile-pic" label="Choose an image" />
                    </Form.Group>
                    {validations}
                </Modal.Body>
                <Modal.Footer>
                    {
                        this.state.updateMode ? <Button variant="danger"
                            onClick={() => this.onDeleteClicked()}>Delete</Button> : null
                    }
                    <Button variant="secondary"
                        onClick={() => this.onAddModalCancel()}>Cancel</Button>{' '}
                    <Button variant="primary"
                        onClick={() => this.handleSubmit()}>{this.state.updateMode ? 'Update' : 'Save'}</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        departments: state.department.departments,
        countries: state.country.countries,
        addResponse: state.employee.employee
    };
};

export default connect(mapStateToProps)(EmployeeAddModal);
