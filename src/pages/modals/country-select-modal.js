import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import { Loading } from "../../components/common";

import { connect } from "react-redux";
import _ from "lodash";
import { getCountries } from "../../actions/countryAction";


class CountrySelectModal extends Component {
    state = {
        countries: [],
        selectedCounId: ''
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getCounts();
    }

    getCounts() {
        this.props.dispatch(getCountries())
    }

    handleDropdownItemCLick(counId) {
        this.setState({ selectedCounId: counId });
    }

    onCounModalCancel() {
        this.props.onCounModalCancel();
    }

    onCounSelect() {
        this.props.onCounSelected(this.state['selectedCounId']);
    }

    render() {
        // const propss = this.props;
        const { countries, dispatch } = this.props;
        if (_.isEmpty(countries)) {
            return (
                <div className="background-container pt-5">
                    <Loading />
                </div>
            );
        }

        let counItems = [];
        for (let i = 0; countries && i < countries.length; i++) {
            counItems.push(
                <Dropdown.Item key={i} onClick={() => this.handleDropdownItemCLick(countries[i]._id)}>
                    {countries[i].name}
                </Dropdown.Item>
            );
        }
        const counItemsDropDown = (
            <Dropdown.Menu>
                {counItems}
            </Dropdown.Menu>
        );
        return (
            <Modal show={true}>
                <Modal.Header>Fitler by country</Modal.Header>
                <Modal.Body>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-components">
                            Select Country
                        </Dropdown.Toggle>
                        {counItemsDropDown}
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={() => this.onCounModalCancel()}>Cancel</Button>{' '}
                    <Button variant="primary"
                        onClick={() => this.onCounSelect()}>Select</Button>{' '}
                </Modal.Footer>
            </Modal>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        countries: state.country.countries,
    };
};

export default connect(mapStateToProps)(CountrySelectModal);
