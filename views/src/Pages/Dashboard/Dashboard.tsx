// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../../Actions";

import {HeaderComponent} from "../../Components";

// import { IAppState } from "../../Reducers/rootReducer";

export interface IProps {
  dispatch: Dispatch<any>;
  setUser: any;
}

// interface IState {}

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default
  };
};

class DashboardPage extends React.PureComponent<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  logoutHandler = () => {
    this.props.setUser("");
    
  }

  public render() {
    return <div>
    <div>
      <HeaderComponent logoutHandler={this.logoutHandler}/>
    </div>
  </div>;
  }
}

const mapDispatchToProps ={
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
