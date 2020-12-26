import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../../reducers/actions";

import {HeaderComponent} from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/sidebar/sidebar.component";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../constants";
import { SitesListing, WorkReportListing } from "../../components/listings";

import './dashboard.scss'
import { logout } from "../../services";


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

  logoutHandler = async () => {
    const logoutRespond = await logout();
    console.log(logoutRespond);
    if(logoutRespond.data){
      this.props.setUser("");
      this.navigateToLoginPage();
    }
  }

  navigateToLoginPage = () => {
    this.props.history.push('/login');
  }

  public render() {
    
    return <div>
    <div>
      <HeaderComponent logoutHandler={this.logoutHandler} user={this.props.user}/>
      <Container fluid>
          <Row>
              <Col sm={2} id="sidebar-wrapper">      
                <Sidebar />
              </Col>
              <Col  sm={10} id="page-content-wrapper">
                <Switch>
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.SITES}`} component={SitesListing} />
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.WORK_REPORT}`} component={WorkReportListing} />
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.EXPENSE}`}>
                    <h1>Expense</h1>
                  </Route>
                  <Route exact path={`${ROUTES.DASHBOARD}`}>
                    <Redirect to={`${ROUTES.DASHBOARD}${ROUTES.SITES}`}/>
                  </Route>
                </Switch>
              </Col> 
          </Row>

      </Container>
    </div>
  </div>;
  }
}

const mapDispatchToProps ={
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
