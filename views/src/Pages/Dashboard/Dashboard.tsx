// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import HeaderComponent from "../../Components/header/header";

// import { IAppState } from "../../Reducers/rootReducer";

export interface IProps {
  dispatch: Dispatch<any>;
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

  public render() {
    return <div>
    <div>
      <HeaderComponent />
    </div>
  </div>;
  }
}

export default connect(mapStateToProps)(DashboardPage);
