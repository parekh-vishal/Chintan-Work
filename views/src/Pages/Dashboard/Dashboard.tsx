import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../../reducers/actions";

import {HeaderComponent} from "../../components";


export interface IProps {
  dispatch: Dispatch<any>;
  setUser: any;
  user: any;
  history: any;
}

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default,
    user: state.user
  };
};

class DashboardPage extends React.PureComponent<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  componentDidMount =  async() => {
    if(!this.props.user || (this.props.user && !this.props.user.token)){
      this.navigateToLoginPage();
    }
  }

  logoutHandler = () => {
    this.props.setUser("");    
  }

  navigateToLoginPage = () => {
    this.props.history.push('/login');
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
