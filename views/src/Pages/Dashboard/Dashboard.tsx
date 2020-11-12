import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../../reducers/actions";

import {HeaderComponent} from "../../components";
import { getUserDetails } from "../../services";


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
    if(!this.props.user.USER || !this.props.user.USER.token){
      this.navigateToLoginPage();
    }else{
      const users = await getUserDetails(this.props.user.USER);
      console.log(users)
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
