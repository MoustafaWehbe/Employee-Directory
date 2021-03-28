import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router,
} from "react-router-dom";

import Employees from "./pages/employees";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            <Switch>
              {/* <Route exact path="/employee/add" component={AddEmployeeForm} /> */}
              <Route path="/employees" exact component={Employees} />

              <Redirect exact from="/" to="/employees" />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
