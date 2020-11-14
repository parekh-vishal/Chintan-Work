import * as React from "react";
import "./App.scss";

import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import DashboardPage from "./pages/dashboard/dashboard";

import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import { ROUTES } from "./constants";

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default
  };
};

class App extends React.PureComponent {
  public render() {
    return (
      <div>
        <Switch>
          <Route path={`${ROUTES.DASHBOARD}`} component={DashboardPage} />
          <Route exact={true} path={`${ROUTES.LOGIN}`} component={LoginPage} />
          <Route exact={true} path={`${ROUTES.SIGNUP}`} component={SignupPage} />
          <Route path="*" component={LoginPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter((connect as any)(mapStateToProps)(App));
