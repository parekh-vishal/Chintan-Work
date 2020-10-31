import * as React from "react";
import "./App.scss";

import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import DashboardPage from "./Pages/Dashboard/Dashboard";
import LoginPage from "./Pages/login/login";
import SignupPage from "./Pages/signup/signup";

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default
  };
};

class App extends React.PureComponent {
  public render() {
    return (
      <div>
        <Route exact={true} path="/" component={DashboardPage} />
        <Route exact={true} path="/login" component={LoginPage} />
        <Route exact={true} path="/signup" component={SignupPage} />
      </div>
    );
  }
}

export default withRouter((connect as any)(mapStateToProps)(App));
