import React, { Component, Fragment } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";

import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites, addNewWorkReport } from "../../../services";
import './work-report-forms.component.scss'
import { FieldArray, Formik, FormikValues } from "formik";
import { WorkDetailTypes, WorkReportTypes } from "../../../typings";
import moment from "moment";

export interface IProps {
  handleClose: any;
}


export class WorkReportForms extends Component<IProps, any> {

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
      allWorkTypeOption: [],
      siteDropdown: {},
      workCategoryDropdown:[]
    };

  }

  public componentDidMount() {
    this.allSites();
    this.setWorkCategoryArray();
  }

  setWorkCategoryArray = () => {
    const WORK_TYPES = ["Concrit", "Plumbling", "Electric", "Tiles"]

    const test1 = [];
    for (let index = 0; index < WORK_TYPES.length; index++) {
      const element = WORK_TYPES[index];
      test1.push({
        value: element,
        label: element
      });
    }

    this.setState({
      allWorkTypeOption: test1
    });
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
    const { Works,
      cementAmount,
      date } = values;

    const siteName = "";//allSitesDetails[0] ? allSitesDetails[0].siteName : "";
    const siteId = "";//allSitesDetails[0]?.siteId ? allSitesDetails[0].siteId : "";
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
                    <Form.Label column lg={2}>Site</Form.Label>
                    <Col>
                      <Select value={this.state.siteDropdown} onChange={(val)=>{this.setState({'siteDropdown': val})}} options={this.state.allSitesAsOption} />
                    </Col>
                  </Form.Row>
                </Form.Group>
      
                <Form.Group controlId="ownerName">
                  <Form.Row>
                    <Form.Label column lg={2}>Date</Form.Label>
                    <Col>
                      <Form.Text>{moment().format('DD/MM/YYYY')}</Form.Text>
                    </Col>
                  </Form.Row>
                </Form.Group>
      
                <div>
                  
                  <FieldArray
                    name="Works"
                    render={arrayHelpers => (
                      <div>
                        {values.Works.map((workDetails: any, idx: any) => (
                          <Fragment key={idx}>
                            <Form.Row>
                              <Col>  
                                <h5 className="float-left">Work Details {idx+1}</h5>
                                <Button variant="primary" className="float-right" onClick={()=>{
                                  arrayHelpers.remove(idx)
                                }}>Remove</Button>
                              </Col>
                            </Form.Row>
                            <hr />
                            <Form.Group controlId="workType">
                              <Form.Row>
                                <Form.Label column lg={2}>Work Type</Form.Label>
                                <Col>
                                  <Select value={this.state.workCategoryDropdown[`wc${idx}`]} onChange={(val)=>{this.setState({workCategoryDropdown: [...this.state.workCategoryDropdown, {[`wc${idx}`]: val}]})}} options={this.state.allWorkTypeOption} />
                                </Col>
                              </Form.Row>
                            </Form.Group>
            
                            <Form.Group controlId={`Works.${idx}.totalworker.mason`}>
                              <Form.Row>
                                <Form.Label column lg={2}>Total Mason</Form.Label>
                                <Col>
                                  <Form.Control type="number" placeholder="Enter Total Mason" onChange={handleChange} onBlur={handleBlur} value={workDetails.totalworker.mason} />
                                </Col>
                              </Form.Row>
                            </Form.Group>
            
                            <Form.Group controlId={`Works.${idx}.totalworker.labour`}>
                              <Form.Row>
                                <Form.Label column lg={2}>Total Labour</Form.Label>
                                <Col>
                                  <Form.Control type="number" placeholder="Enter Total Labour" onChange={handleChange} onBlur={handleBlur} value={workDetails.totalworker.labour} />
                                </Col>
                              </Form.Row>
                            </Form.Group>
                                    
                            <Form.Group controlId={`Works.${idx}.workDescription`}>
                              <Form.Row>
                                <Form.Label column lg={2}>Work Description</Form.Label>
                                <Col>
                                  <Form.Control as="textarea" placeholder="Enter Work Description" onChange={handleChange} onBlur={handleBlur} value={workDetails.workDescription} />
                                </Col>
                              </Form.Row>
                            </Form.Group>
            
                          </Fragment>
                        ))}
                        
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
