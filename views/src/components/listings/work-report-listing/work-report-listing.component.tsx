import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllWorkReport } from "../../../services";
import './work-report-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import WorkReportForms from "../../Forms/work-report-forms/work-report-forms.component";
import { IWorkReportTypes } from "../../../typings";

export const WorkReportListing = (props: any) => {
 
  var [ listData, setListData ] = useState([] as Array<IWorkReportTypes>);
  var [ currentWorkReport, setCurrentWorkReport ] = useState({} as IWorkReportTypes);
  const [isReadOnly, setReadOnlyFlag] = useState(false);
  const [show, setShow] = useState(false);

  const allWorkReport = async () => {
    const allWorkReportRespond = await getAllWorkReport();
    if(allWorkReportRespond && allWorkReportRespond.data){
      setListData(allWorkReportRespond.data);
    }
    //setListData([]);
  }

  useEffect( () => {
    allWorkReport();
  }, []);

  const viewWorkReport = (workObject: IWorkReportTypes) => {
    setReadOnlyFlag(true);
    setCurrentWorkReport(workObject);
    handleShow();
  }

  const tableObject = [
  {
    columnName: "Id",
    key: "workId",
    type: "text",
    view: (rowObj:any, text: any) => (<Button variant="link" onClick={() => viewWorkReport(rowObj)}>{text}</Button>),
  },
  {
    columnName: "Reporter",
    key: "supervisorName",
    type: "text",
    view: (rowObj:any, text: any) => (<h6>{text}</h6>),
  },
  {
    columnName: "Site Name",
    key: "siteName",
    type: "text",
    view: (rowObj:any, text: any) => (<h6>{text}</h6>),
  },
  {
    columnName: "Date",
    key: "date",
    type: "date",
    view: (rowObj:any, text: any) => (moment(text).format('DD/MM/YYYY')),
  }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setReadOnlyFlag(false);
    setCurrentWorkReport({} as IWorkReportTypes);
    allWorkReport();
  };

  const editWorkReport = (obj: IWorkReportTypes) => {
    setCurrentWorkReport(obj);
    handleShow();
  }

  return (
    <>
      <Container fluid>
        <Row className="add-buttton-row">
          <Col>
            <h3 className="float-left">Work Reports</h3>
            <Button variant="outline-primary" size="sm" className="float-right" onClick={handleShow}>Add Work Report</Button>
          </Col>
        </Row>
        <Row>
          <Col>
          <Table striped bordered hover size="sm">
            <thead>
                <tr>
                  {tableObject.map(columnObj => (
                    <th key={columnObj.columnName}>
                      {columnObj.columnName}
                    </th>
                  ))}
                </tr>
            </thead>
            <tbody>
              {listData.map((rowObj: any) => (
                  <tr key={rowObj._id}>
                    {tableObject.map((columnObj, index) => 
                      (<td key={columnObj.columnName}>
                        {columnObj.view(rowObj, rowObj[columnObj.key])}
                        {tableObject.length-1 === index && 
                          <Fragment>
                            <Button variant="link" className="float-right" onClick={()=>{editWorkReport(rowObj)}}>Edit</Button>
                          </Fragment>
                        }
                      </td>)
                    )}
                  </tr>
                ))
              }
            </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
      <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show} size="xl">
        <WorkReportForms handleClose={handleClose} currentWorkReport={currentWorkReport} isReadOnly={isReadOnly}></WorkReportForms>
      </ModalComponent>
    </>
  );
};
