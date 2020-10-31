// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
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

class LoginPage extends React.PureComponent<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    this.props.dispatch(DefaultActionCreator.action());
  }

  public render() {
    return <div>This is Login Page</div>;
  }
}

export default connect(mapStateToProps)(LoginPage);
