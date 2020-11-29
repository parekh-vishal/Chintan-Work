import React from "react";
import { Button, Col, Modal, Nav, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllUsersDetails, getSiteSettings } from "../../../services";
import './sites-settings.component.scss'
import { connect } from "react-redux";
import Select from "react-select";
import { ISiteRules } from "../../../typings";

interface IDropdownObject {
  value: string;
  label: string;
}

interface IState {
  siteSetting: ISiteRules;
  allUsersDetails: Array<{}>;
  allUsersAsOption: Array<IDropdownObject>;

  adminUsersOpt: Array<{}>;
  supervisorsOpt: Array<{}>;
  userExpenseOpt: Array<{}>;

  currentView: string;
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

const VIEW_NAMES = {
  ADMIN_VIEW: "ADMIN_VIEW",
  SUPERVISOR_VIEW: "SUPERVISOR_VIEW",
  WORK_CATEGORY_VIEW: "WORK_CATEGORY_VIEW"
}

class SitesSettings extends React.PureComponent<any, IState> {

  public constructor(props: any) {
    super(props);

    this.state = {
      siteSetting: {} as ISiteRules,
      allUsersDetails: [],
      allUsersAsOption: [],

      adminUsersOpt:[],
      supervisorsOpt:[],
      userExpenseOpt:[],

      currentView: VIEW_NAMES.ADMIN_VIEW
    };
  }

  componentDidMount =  async() => {
    this.fetchSiteSetting();
  }

  fetchSiteSetting = async () => {
    var respond = await getSiteSettings({siteId: this.props.currentSite.siteId,userId: this.props.user.user_id});
    console.log(respond);
    if (respond.data) {
      this.setState({
        siteSetting: respond.data
      });
      this.fetchAllUsers();
    }
  }

  setInitAdminUsers = () => {
    const {siteSetting, allUsersAsOption} = this.state;
    const allAdminMap = siteSetting.adminUsers && siteSetting.adminUsers.map((obj: any)=>{
      return obj.adminUserId
    });
    console.log(allAdminMap)
    const newData = [];
    for (let index = 0; index < allUsersAsOption.length; index++) {
      const element = allUsersAsOption[index];
      if(element.value && allAdminMap.indexOf(element.value) > -1){
        newData.push(element);
      }
    }

    this.setState({
      adminUsersOpt: newData
    });
  }

  fetchAllUsers = async () => {
    var respond = await getAllUsersDetails();
    if (respond.data) {
      const userOptions: Array<IDropdownObject> = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        userOptions.push({
          value: element.user_id,
          label: `${element.firstName} ${element.lastName}`
        });
      }

      this.setState({
        allUsersDetails: respond.data,
        allUsersAsOption: userOptions
      });
      
      this.setInitAdminUsers();
    }
  };
  
  submitEvent = async () => {  
    
  }

  setAdminUsersOpt = (value: any) => {
    console.log(value);
    this.setState({
      adminUsersOpt: value
    });

  }

  handleViews = (selectedKey: any) => {
    this.setState({
      currentView: selectedKey
    })
  }

  public render() {
    const {currentView, adminUsersOpt, allUsersAsOption} = this.state;
    return <>
        <Modal.Header closeButton>
          <Modal.Title>Site Settings</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <Nav fill variant="tabs" defaultActiveKey={VIEW_NAMES.ADMIN_VIEW} onSelect={this.handleViews}>
          <Nav.Item>
            <Nav.Link eventKey={VIEW_NAMES.ADMIN_VIEW}>Admin Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={VIEW_NAMES.SUPERVISOR_VIEW}>Supervisors</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={VIEW_NAMES.WORK_CATEGORY_VIEW}>Work Category</Nav.Link>
          </Nav.Item>
        </Nav>
        
        {currentView === VIEW_NAMES.ADMIN_VIEW && 
          <Row>
            <Col>
              <Select value={adminUsersOpt} onChange={this.setAdminUsersOpt} options={allUsersAsOption} isMulti={true} />
            </Col>
          </Row>
        }
        {currentView === VIEW_NAMES.SUPERVISOR_VIEW && 
          <Row>
            <Col><h1>Supervisors</h1></Col>
          </Row>
        }
        {currentView === VIEW_NAMES.WORK_CATEGORY_VIEW && 
          <Row>
            <Col><h1>Work Category</h1></Col>
          </Row>
        }
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
            </Button>
          <Button variant="primary" type="submit">Save</Button>
        </Modal.Footer>
      </>
    ;
  }
};

export default connect(mapStateToProps, {})(SitesSettings);
