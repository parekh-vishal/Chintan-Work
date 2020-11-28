import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Nav, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { addNewSite, getSiteSettings } from "../../../services";
import './sites-settings.component.scss'
import { FormikValues, useFormik } from "formik";
import { SiteType, SupervisorType, UserTypes } from "../../../typings";
import { connect } from "react-redux";


const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

const SitesSettings = (props: any) => {

  const VIEW_NAMES = {
    ADMIN_VIEW: "ADMIN_VIEW",
    SUPERVISOR_VIEW: "SUPERVISOR_VIEW",
    WORK_CATEGORY_VIEW: "WORK_CATEGORY_VIEW"
  }

  const [allUsersDetails, setAllUsersDetails] = useState([] as Array<UserTypes>);
  const [currentView, setViewName] = useState(VIEW_NAMES.ADMIN_VIEW);

  const allUsers = async () => {
    console.log(props.currentSite)
    //const todo = useSelector((state) => state.todos[props.id])
    var respond = await getSiteSettings({siteId: props.currentSite.siteId,userId: props.user.user_id});
    console.log(respond);
    if (respond.data) {
      // const userOptions: Array<{}> = [];
      // for (let index = 0; index < respond.data.length; index++) {
      //   const element = respond.data[index];
      //   userOptions.push({
      //     value: element.user_id,
      //     label: `${element.firstName} ${element.lastName}`
      //   });
      // }
      // setAllUsersDetails(respond.data)
      //setAllUsersAsOption(userOptions)
    }
  }

  useEffect(() => {
    allUsers();
  }, []);

  const siteFormsObj: SiteType = {
    siteName: '',
    ownerName: '',
    ownerContactNo: '',
    siteAddress: {
      AddressLine1: '',
      City: '',
      State: '',
      pincode: 0,
    },
    siteInaugurationDate: new Date(),
    siteEstimate: '',
    tentativeDeadline: new Date(),
    supervisors: [
      {
        siteSupervisorName: '',
        siteSupervisorNo: 0,
        siteSupervisorId: ''
      }
    ]
  }

  const validateForm = (values: FormikValues) => {
    const errors: any = {};
    if (!values.siteName) {
      errors.siteName = 'Required';
    }

    if (!values.ownerName) {
      errors.ownerName = 'Required';
    }

    if (!values.ownerContactNo) {
      errors.ownerContactNo = 'Required';
    }

    if (!values.siteAddress.AddressLine1) {
      errors.siteAddress.AddressLine1 = 'Required';
    }

    if (!values.siteAddress.City) {
      errors.siteAddress.City = 'Required';
    }

    if (!values.siteAddress.State) {
      errors.siteAddress.State = 'Required';
    }

    if (!values.siteInaugurationDate) {
      errors.siteInaugurationDate = 'Required';
    }

    if (!values.siteEstimate) {
      errors.siteEstimate = 'Required';
    }

    if (!values.tentativeDeadline) {
      errors.tentativeDeadline = 'Required';
    }

    return errors;
  }

  const submitEvent = async (values: FormikValues) => {
    const { ownerContactNo, ownerName, siteAddress, siteEstimate, siteInaugurationDate, siteName, tentativeDeadline } = values;
    const supervisors: Array<SupervisorType> = [];
    for (let index = 0; index < allUsersDetails.length; index++) {
      const element = allUsersDetails[index];
      supervisors.push({
        siteSupervisorId: element.user_id,
        siteSupervisorName: `${element.firstName} ${element.lastName}`,
        siteSupervisorNo: element.contactNo
      });

    }
    const newSiteData: SiteType = {
      ownerContactNo,
      ownerName,
      siteAddress,
      siteEstimate,
      siteInaugurationDate,
      siteName,
      supervisors,
      tentativeDeadline
    };

    var siteCreated = await addNewSite(newSiteData);
    if (siteCreated && siteCreated.data) {
      props.handleClose();
    }
  }

  const formik1 = useFormik({
    initialValues: siteFormsObj,
    onSubmit: submitEvent,
    validate: validateForm
  });

  const handleViews = (selectedKey: any) => {
    setViewName(selectedKey);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Site Settings</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik1.handleSubmit}>
        <Modal.Body>
        <Nav fill variant="tabs" defaultActiveKey={VIEW_NAMES.ADMIN_VIEW} onSelect={handleViews}>
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
            <Col><h1>Admin Users</h1></Col>
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
          <Button variant="secondary" onClick={props.handleClose}>
            Close
            </Button>
          <Button variant="primary" type="submit">Create</Button>
        </Modal.Footer>
      </Form>
    </>
  );
};

export default connect(mapStateToProps, {})(SitesSettings);
