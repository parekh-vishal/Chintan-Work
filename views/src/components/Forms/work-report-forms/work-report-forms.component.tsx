import React, { Component } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";

import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites, addNewWorkReport, getSiteSettings, editWorkReport } from "../../../services";
import './work-report-forms.component.scss'
import { FieldArray, Formik, FormikValues } from "formik";
import { IDropdownObject, UserTypes, IWorkDetailTypes, IWorkReportTypes } from "../../../typings";
import moment from "moment";
import { connect } from "react-redux";

export interface IProps {
  handleClose: any;
  user: UserTypes;
  currentWorkReport?: IWorkReportTypes;
  isReadOnly: boolean;
}

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

class WorkReportForms extends Component<IProps, any> {

  public constructor(props: IProps) {
    super(props);

    const WorkDetailTypes: IWorkDetailTypes = {
      totalworker: {
        labour: 0,
        mason: 0
      },
      workDescription: "",
      workType: "",
      workCategoryId: "",
      workTypeObject: {
        label: "",
        value: ""
      }
    }
    const workReportFormsObj: IWorkReportTypes = this.getWorkReportFormObject(WorkDetailTypes);
    
    this.state = {
      initialValues: workReportFormsObj,
      allSitesAsOption: [],
      siteRespond: [],
      allWorkTypeOption: [],
      WorkDetailTypes
    };

  }

  getWorkReportFormObject = (WorkDetailTypes: IWorkDetailTypes) => {

    if(this.props.currentWorkReport && this.props.currentWorkReport._id){
      const allExistingWorks = [...this.props.currentWorkReport.Works];
      for (let index = 0; index < allExistingWorks.length; index++) {
        const element = allExistingWorks[index];
        element.workTypeObject = {
          label: element.workType,
          value: element.workCategoryId,
        }
        
      }
      return {
        workId : this.props.currentWorkReport.workId,
        Works: allExistingWorks,
        cementAmount: this.props.currentWorkReport.cementAmount,
        date: moment(this.props.currentWorkReport.date).toDate(),
        siteObject: {
          value: this.props.currentWorkReport.siteId,
          label: this.props.currentWorkReport.siteName,
        },
        siteId: this.props.currentWorkReport.siteId,
        supervisorId: this.props.currentWorkReport.supervisorId,
        supervisorName: this.props.currentWorkReport.supervisorName,
        siteName: this.props.currentWorkReport.siteName
      }
    }else{
      return {
        Works: [WorkDetailTypes],
        cementAmount: 0,
        date: moment().toDate(),
        siteId: "",
        siteObject: {} as IDropdownObject,
        supervisorId: "",
        supervisorName: "",
        siteName: ""
      }
    }
  }

  public componentDidMount() {
    this.allSites();
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
      });

      if(this.props.currentWorkReport && this.props.currentWorkReport._id){
        this.fetchSiteSetting({value: this.props.currentWorkReport.siteId});
      }
    }
  }

  fetchSiteSetting = async (siteObj: any) => {
    var respond = await getSiteSettings({siteId: siteObj.value, userId: this.props.user.user_id});
    if (respond.data && respond.data.workCategories) {
      const newArray = [];
      for (let index = 0; index < respond.data.workCategories.length; index++) {
        const element = respond.data.workCategories[index];
        newArray.push({
          value: element.workCategoryId,
          label: element.workType
        });
      }
  
      this.setState({
        allWorkTypeOption: newArray
      });
    }
  }

  validateForm = (values: FormikValues) => {
    const errors: any = {};
    if (!values.siteObject.value) {
      errors.siteName = 'Required';
    }

    if (!values.date) {
      errors.date = 'Required';
    }

    return errors;
  }

  submitEvent = async (values: FormikValues) => {
    const { 
      workId,
      Works,
      cementAmount,
      date,
      siteObject
    } = values;

    const newWorkReportData: IWorkReportTypes = {
      Works,
      cementAmount,
      date,
      siteId: siteObject.value,
      supervisorId: this.props.user.user_id,
      supervisorName: `${this.props.user.firstName} ${this.props.user.lastName}`,
      siteName: siteObject.label
    };

    const workReportCreated = await ((this.props.currentWorkReport && this.props.currentWorkReport._id) ? editWorkReport({...newWorkReportData, _id: this.props.currentWorkReport._id, workId: this.props.currentWorkReport.workId }) : addNewWorkReport(newWorkReportData));

    if (workReportCreated && workReportCreated.data) {
      this.props.handleClose();
    }
  }

  public render(){
    const {
      isReadOnly,
      currentWorkReport
    } = this.props;
    return (
      <>
        <Modal.Header closeButton>
          <Modal.Title>{`${isReadOnly ? 'View' : (currentWorkReport && currentWorkReport.workId) ? 'Edit' : 'New'} Work Report`}</Modal.Title>
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
                <Form.Group controlId="siteObject">
                  <Form.Row>
                    <Form.Label column lg={1}>Site</Form.Label>
                    <Col>
                      <Select value={values.siteObject} onChange={(val)=>{setFieldValue('siteObject', val);this.fetchSiteSetting(val);}} options={this.state.allSitesAsOption} isDisabled={isReadOnly}/>
                      <Form.Text className="text-danger">{errors.siteName}</Form.Text>
                    </Col>
                  </Form.Row>
                </Form.Group>
      
                <Form.Group controlId="ownerName">
                  <Form.Row>
                    <Form.Label column lg={1}>Date</Form.Label>
                    <Col>
                      <DatePicker selected={values.date} onChange={(date) => setFieldValue('date', date)} readOnly={isReadOnly} />
                      <Form.Text className="text-danger">{errors.date}</Form.Text>
                    </Col>
                  </Form.Row>
                </Form.Group>

                <Form.Group controlId="cementAmount">
                  <Form.Row>
                    <Form.Label column lg={1}>Cement</Form.Label>
                    <Col>
                      <Form.Control type="number" placeholder="Enter used cement count" onChange={handleChange} name="cementAmount" onBlur={handleBlur} value={values.cementAmount} readOnly={isReadOnly}/>
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
                                <Select value={workDetails.workTypeObject} name={`Works[${idx}].workTypeObject`} onChange={(val)=>{setFieldValue(`Works[${idx}].workTypeObject`, val);setFieldValue(`Works[${idx}].workCategoryId`, val.value);setFieldValue(`Works[${idx}].workType`, val.label);}} options={this.state.allWorkTypeOption} isDisabled={isReadOnly}/>
                              </td>
                              <td>
                                <Form.Control type="number" placeholder="Enter Total Mason" onChange={handleChange} name={`Works[${idx}].totalworker.mason`} onBlur={handleBlur} value={workDetails.totalworker.mason} readOnly={isReadOnly}/>
                              </td>
                              <td>
                                <Form.Control type="number" placeholder="Enter Total Labour" onChange={handleChange} name={`Works[${idx}].totalworker.labour`} onBlur={handleBlur} value={workDetails.totalworker.labour} readOnly={isReadOnly}/>
                              </td>
                              <td>
                                <Form.Control as="textarea" placeholder="Enter Work Description" onChange={handleChange} name={`Works[${idx}].workDescription`}onBlur={handleBlur} value={workDetails.workDescription} readOnly={isReadOnly}/>
                              </td>
                            </tr>
                            ))}
                          </tbody>
                        </Table>
                        
                        {!isReadOnly && <Button variant="primary" onClick={()=>{
                          arrayHelpers.push(this.state.WorkDetailTypes)
                        }}>Add Another Work Details</Button>}
                      </div>
                    )} />
                </div>
      
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                {!isReadOnly && <Button variant="primary" type="submit">Create</Button>}
              </Modal.Footer>
            </Form>
            )}
        </Formik>
      </>
    );
  }
};

export default connect(mapStateToProps, {})(WorkReportForms);