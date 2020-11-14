import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { setUser } from "../../reducers/actions";

import {HeaderComponent} from "../../components";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/sidebar/sidebar.component";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../../constants";
import { SitesListing } from "../../components/listings";


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
      <HeaderComponent logoutHandler={this.logoutHandler} user={this.props.user}/>
      <Container fluid>
          <Row>
              <Col xs={2} id="sidebar-wrapper">      
                <Sidebar />
              </Col>
              <Col  xs={10} id="page-content-wrapper">
                <Switch>
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.SITES}`} component={SitesListing}>
                    
                  </Route>
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.WORK_REPORT}`}>
                    <h1>Work Report</h1>
                  </Route>
                  <Route exact path={`${ROUTES.DASHBOARD}${ROUTES.EXPENSE}`}>
                    <h1>Expense</h1>
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
