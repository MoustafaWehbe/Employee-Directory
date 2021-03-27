import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { Loading } from "../../components/common";

import { connect } from "react-redux";
import _ from "lodash";
import { getDepartments } from "../../actions/departmentAction";


class DepartmentSelectModal extends Component {
    state = {
        departments: [],
        selectedDepId: '',
        selectedDepName: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getDeps();
    }

    getDeps() {
        this.props.dispatch(getDepartments())
    }

    handleDropdownItemCLick(depId, name) {
        this.setState({ selectedDepId: depId, selectedDepName: name });
    }

    onDepModalCancel() {
        this.props.onDepModalCancel();
    }

    onDepSelect() {
        this.props.onDepSelected(this.state['selectedDepId']);
    }

    render() {
        // const propss = this.props;
        const { departments, dispatch } = this.props;
        if (_.isEmpty(departments)) {
            return (
                <div className="background-container pt-5">
                    <Loading />
                </div>
            );
        }

        let depItems = [];
        for (let i = 0; departments && i < departments.length; i++) {
            depItems.push(
                <Dropdown.Item key={i} onClick={() => this.handleDropdownItemCLick(departments[i]._id, departments[i].name)}>
                    {departments[i].name}
                </Dropdown.Item>
            );
        }
        const depItemsDropDown = (
            <Dropdown.Menu>
                {depItems}
            </Dropdown.Menu>
        );
        return (
            <Modal show={true}>
                <Modal.Header>Fitler by department</Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components">
                            {this.state.selectedDepName || 'Select Department'}
                        </Dropdown.Toggle>
                        {depItemsDropDown}
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => this.onDepModalCancel()}>Cancel</Button>{' '}
                    <Button variant="primary"
                        onClick={() => this.onDepSelect()}>Select</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        departments: state.department.departments,
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getDepartments: () =>
//             dispatch(getDepartments()),
//     };
// };

export default connect(mapStateToProps)(DepartmentSelectModal);
