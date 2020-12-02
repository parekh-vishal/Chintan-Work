import React, { Component } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites, addNewWorkReport, getAllWorkCategory } from "../../../services";
import './work-report-forms.component.scss'
import { FieldArray, Formik, FormikValues } from "formik";
import { UserTypes, WorkDetailTypes, WorkReportTypes } from "../../../typings";
import moment from "moment";
import { connect } from "react-redux";

export interface IProps {
  handleClose: any;
  user: UserTypes
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

class WorkReportForms extends Component<IProps, any> {

  public constructor(props: IProps) {
    super(props);
    const workDetailsFormsObj: WorkDetailTypes = {
      totalworker: {
        labour: 0,
        mason: 0
      },
      workDescription: "",
      workType: ""
    }

    const workReportFormsObj: WorkReportTypes = {
      Works: [workDetailsFormsObj],
      cementAmount: 0,
      date: moment().toDate(),
      siteId: "",
      supervisorId: "",
      supervisorName: "",
      siteName: ""
    }
    
    this.state = {
      initialValues: workReportFormsObj,
      allSitesAsOption: [],
      siteRespond: [],
      allWorkTypeOption: []
    };

  }

  public componentDidMount() {
    this.allSites();
    this.setWorkCategoryArray();
  }

  setWorkCategoryArray = async () => {
    var respond = await getAllWorkCategory();
    if (respond.data) {
      const newArray = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        newArray.push({
          value: element.WorkTypes,
          label: element.WorkTypes
        });
      }
  
      this.setState({
        allWorkTypeOption: newArray
      });
    }
  }

  allSites = async () => {
    const respond = await getAllSites();
    if (respond.data) {
      const sitesOptions: Array<{}> = [];
      for (let index = 0; index < respond.data.length; index++) {
        const element = respond.data[index];
        sitesOptions.push({
          value: element.siteId,
          label: element.siteName
        });
      }

      this.setState({
        allSitesAsOption: sitesOptions,
        siteRespond: respond.data
      })
    }
  }

  validateForm = (values: FormikValues) => {
    const errors: any = {};
    if (!values.siteName) {
      errors.siteName = 'Required';
    }
    

    return errors;
  }

  submitEvent = async (values: FormikValues) => {
    const { 
      Works,
      cementAmount,
      date,
      siteId
    } = values;

    const siteName = "";//allSitesDetails[0] ? allSitesDetails[0].siteName : "";
    const supervisorId = '0';
    const supervisorName = "";

    const newWorkReportData: WorkReportTypes = {
      Works,
      cementAmount,
      date,
      siteId,
      supervisorId,
      supervisorName,
      siteName
    };

    const workReportCreated = await addNewWorkReport(newWorkReportData);
    if (workReportCreated && workReportCreated.data) {
      this.props.handleClose();
    }
  }


  public render(){

    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>New Work Report</Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={this.state.initialValues}
          validate={this.validateForm}
          onSubmit={this.submitEvent}
        >
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              isSubmitting,
              /* and other goodies */
            }) => (

            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Group controlId="siteId">
                  <Form.Row>
                    <Form.Label column lg={1}>Site</Form.Label>
                    <Col>
                      <Select value={values.siteId} onChange={(val)=>{setFieldValue('siteId', val)}} options={this.state.allSitesAsOption} />
                    </Col>
                  </Form.Row>
                </Form.Group>
      
                <Form.Group controlId="ownerName">
                  <Form.Row>
                    <Form.Label column lg={1}>Date</Form.Label>
                    <Col>
                      <DatePicker selected={values.date} onChange={(date) => setFieldValue('date', date)} />
                    </Col>
                  </Form.Row>
                </Form.Group>

                <Form.Group controlId="cementAmount">
                  <Form.Row>
                    <Form.Label column lg={1}>Cement</Form.Label>
                    <Col>
                      <Form.Control type="number" placeholder="Enter used cement count" onChange={handleChange} name="cementAmount" onBlur={handleBlur} value={values.cementAmount} />
                    </Col>
                  </Form.Row>
                </Form.Group>
      
                <div>
                  
                  <FieldArray
                    name="Works"
                    render={arrayHelpers => (
                      <div>
                        <Table bordered size="sm">
                          <colgroup>
                            <col width="5%" />
                            <col width="25%" />
                            <col width="15%" />
                            <col width="15%" />
                            <col width="40%" />
                          </colgroup>
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Work Type</th>
                              <th>Mason</th>
                              <th>Labour</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {values.Works.map((workDetails: any, idx: any) => (
                            <tr key={idx}>
                              <td>{idx+1}</td>
                              <td>
                                <Select value={workDetails.workType} name={`Works[${idx}].workType`} onChange={(val)=>{setFieldValue(`Works[${idx}].workType`, val)}} options={this.state.allWorkTypeOption} />
                              </td>
                              <td>
                                <Form.Control type="number" placeholder="Enter Total Mason" onChange={handleChange} name={`Works[${idx}].totalworker.mason`} onBlur={handleBlur} value={workDetails.totalworker.mason} />
                              </td>
                              <td>
                                <Form.Control type="number" placeholder="Enter Total Labour" onChange={handleChange} name={`Works[${idx}].totalworker.labour`} onBlur={handleBlur} value={workDetails.totalworker.labour} />
                              </td>
                              <td>
                                <Form.Control as="textarea" placeholder="Enter Work Description" onChange={handleChange} name={`Works[${idx}].workDescription`}onBlur={handleBlur} value={workDetails.workDescription} />
                              </td>
                            </tr>
                            ))}
                          </tbody>
                        </Table>
                        
                        <Button variant="primary" onClick={()=>{
                          console.log(this.state.initialValues.Works);
                          arrayHelpers.push(this.state.initialValues.Works[0])
                        }}>Add Another Work Details</Button>
                      </div>
                    )} />
                </div>
      
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                <Button variant="primary" type="submit">Create</Button>
              </Modal.Footer>
            </Form>
            )}
        </Formik>
      </>
    );
  }
};

export default connect(mapStateToProps, {})(WorkReportForms);