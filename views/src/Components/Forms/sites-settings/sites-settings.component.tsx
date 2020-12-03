import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllUsersDetails, getAllWorkCategory, getSiteSettings, updateSiteSettings } from "../../../services";
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

  allWorkCategory: Array<{}>;
  allWorkCategoryAsOption: Array<IDropdownObject>;

  adminUsersOpt: Array<IDropdownObject>;
  supervisorsOpt: Array<IDropdownObject>;
  userExpenseOpt: Array<IDropdownObject>;
  workCategoryOpt: Array<IDropdownObject>;

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
  EXPENSE_USERS_VIEW: "EXPENSE_USERS_VIEW",
  WORK_CATEGORY_VIEW: "WORK_CATEGORY_VIEW"
}

class SitesSettings extends React.PureComponent<any, IState> {

  public constructor(props: any) {
    super(props);

    this.state = {
      siteSetting: {} as ISiteRules,
      allWorkCategory: [],
      allWorkCategoryAsOption: [],

      allUsersDetails: [],
      allUsersAsOption: [],

      adminUsersOpt: [],
      supervisorsOpt: [],
      userExpenseOpt: [],
      workCategoryOpt: [],

      currentView: VIEW_NAMES.ADMIN_VIEW
    };
  }

  componentDidMount =  async() => {
    this.fetchSiteSetting();
  }

  fetchAllWorkCategory = async () => {
    var respond = await getAllWorkCategory();
    if (respond.data) {
      console.log(this.state.siteSetting.workCategories);
      const alreadyExistWorkType = this.state.siteSetting.workCategories && this.state.siteSetting.workCategories.map((obj: any)=>{
        return obj.workCategoryId
      });
      const tempWorkCategory = [];
      const selectedWorkType = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        tempWorkCategory.push({
          value: element.workId,
          label: element.WorkTypes
        });

        if(alreadyExistWorkType.indexOf(element.workId) > -1 ){
          selectedWorkType.push({
            value: element.workId,
            label: element.WorkTypes
          });
        }
        
      }

      this.setState({
        allWorkCategory: respond.data,
        allWorkCategoryAsOption: tempWorkCategory,
        workCategoryOpt: selectedWorkType
      });
    }
  }

  fetchSiteSetting = async () => {
    var respond = await getSiteSettings({siteId: this.props.currentSite.siteId,userId: this.props.user.user_id});
    if (respond.data) {
      this.setState({
        siteSetting: respond.data
      });
      this.fetchAllUsers();
      this.fetchAllWorkCategory();
    }
  }

  setInitAdminUsers = () => {
    const {siteSetting, allUsersAsOption} = this.state;
    const allAdminMap = siteSetting.adminUsers && siteSetting.adminUsers.map((obj: any)=>{
      return obj.adminUserId
    });
    const allSupervisorsMap = siteSetting.supervisors && siteSetting.supervisors.map((obj: any)=>{
      return obj.supervisorId
    });
    const allExpenseUserMap = siteSetting.userExpense && siteSetting.userExpense.map((obj: any)=>{
      return obj.expenseUserId
    });
    const adminUsersOpt = [];
    const supervisorsOpt = [];
    const userExpenseOpt = [];
    for (let index = 0; index < allUsersAsOption.length; index++) {
      const element = allUsersAsOption[index];
      if(element.value && allAdminMap.indexOf(element.value) > -1){
        adminUsersOpt.push(element);
      }

      if(element.value && allSupervisorsMap.indexOf(element.value) > -1){
        supervisorsOpt.push(element);
      }

      if(element.value && allExpenseUserMap.indexOf(element.value) > -1){
        userExpenseOpt.push(element);
      }

    }

    this.setState({
      adminUsersOpt,
      supervisorsOpt,
      userExpenseOpt
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
  
  handleSubmit = async () => {
    const body = {
      adminUsers: this.getDataFromView(VIEW_NAMES.ADMIN_VIEW),
      supervisors: this.getDataFromView(VIEW_NAMES.SUPERVISOR_VIEW),
      userExpense: this.getDataFromView(VIEW_NAMES.EXPENSE_USERS_VIEW),
      workCategories: this.getDataFromView(VIEW_NAMES.WORK_CATEGORY_VIEW),
    };
    const updateData = await updateSiteSettings({siteId: this.props.currentSite.siteId, body});
    if(updateData.data){
      console.log(updateData.data);
      this.props.handleClose();
    }
  }

  getDataFromView = (userType: string) => {
    const newUserArray: any = [];
    const { 
      adminUsersOpt,
      supervisorsOpt,
      userExpenseOpt,
      workCategoryOpt
    } = this.state;
    let arrayLength = 0
    switch (userType) {
      case VIEW_NAMES.ADMIN_VIEW:
        arrayLength = adminUsersOpt ? adminUsersOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = adminUsersOpt[index];
          newUserArray.push({
            adminUserId: element.value,
            adminUserName: element.label,
          });
        }
        break;
      case VIEW_NAMES.SUPERVISOR_VIEW:
        arrayLength = supervisorsOpt ? supervisorsOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = supervisorsOpt[index];
          newUserArray.push({
            supervisorId: element.value,
            supervisorName: element.label,
          });
        }
        break;
      case VIEW_NAMES.EXPENSE_USERS_VIEW:
        arrayLength = userExpenseOpt ? userExpenseOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = userExpenseOpt[index];
          newUserArray.push({
            expenseUserId: element.value,
            expenseUserName: element.label,
          });
        }
      break;
      case VIEW_NAMES.WORK_CATEGORY_VIEW:
        arrayLength = workCategoryOpt ? workCategoryOpt.length : 0;
        for (let index = 0; index < arrayLength; index++) {
          const element = workCategoryOpt[index];
          newUserArray.push({
            workCategoryId: element.value,
            workType: element.label,
          });
        }
      break;
    
      default:
        break;
    }

    return newUserArray;
  }

  setUsersOptState = (value: any, viewName: string) => {
    switch (viewName) {
      case VIEW_NAMES.ADMIN_VIEW:
        this.setState({
          adminUsersOpt: value
        });
        break;
      case VIEW_NAMES.SUPERVISOR_VIEW:
        this.setState({
          supervisorsOpt: value
        });
        break;
      case VIEW_NAMES.EXPENSE_USERS_VIEW:
        this.setState({
          userExpenseOpt: value
        });
        break;
      case VIEW_NAMES.WORK_CATEGORY_VIEW:
        this.setState({
          workCategoryOpt: value
        });
        break;
    
      default:
        break;
    }

  }

  handleViews = (selectedKey: any) => {
    this.setState({
      currentView: selectedKey
    })
  }

  public render() {
    const {
      adminUsersOpt,
      allUsersAsOption,
      supervisorsOpt,
      userExpenseOpt,
      workCategoryOpt,
      allWorkCategoryAsOption
    } = this.state;
    return <>
        <Modal.Header closeButton>
          <Modal.Title>Site Settings</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        
          <Row>
            <Col>Admin Users</Col>
            <Col xs={10}>
              <Select value={adminUsersOpt} onChange={(value)=>this.setUsersOptState(value, VIEW_NAMES.ADMIN_VIEW)} options={allUsersAsOption} isMulti={true} />
            </Col>
          </Row>
          <Row>
            <Col>Supervisors</Col>
            <Col xs={10}>
              <Select value={supervisorsOpt} onChange={(value)=>this.setUsersOptState(value, VIEW_NAMES.SUPERVISOR_VIEW)} options={allUsersAsOption} isMulti={true} />
            </Col>
          </Row>
          <Row>
            <Col>Expense Users</Col>
            <Col xs={10}>
              <Select value={userExpenseOpt} onChange={(value)=>this.setUsersOptState(value, VIEW_NAMES.EXPENSE_USERS_VIEW)} options={allUsersAsOption} isMulti={true} />
            </Col>
          </Row>
          <Row>
            <Col>Site Category</Col>
            <Col xs={10}>
              <Select value={workCategoryOpt} onChange={(value)=>this.setUsersOptState(value, VIEW_NAMES.WORK_CATEGORY_VIEW)} options={allWorkCategoryAsOption} isMulti={true} />
            </Col>
          </Row>
        

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
            </Button>
          <Button variant="primary" onClick={this.handleSubmit}>Save</Button>
        </Modal.Footer>
      </>
    ;
  }
};

export default connect(mapStateToProps, {})(SitesSettings);
