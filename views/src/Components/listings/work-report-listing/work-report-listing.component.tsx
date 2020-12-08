import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllWorkReport } from "../../../services";
import './work-report-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import WorkReportForms from "../../Forms/work-report-forms/work-report-forms.component";
import { WorkReportTypes } from "../../../typings";

export const WorkReportListing = (props: any) => {
 
  var [ listData, setListData ] = useState([] as Array<WorkReportTypes>);
  var [ currentWorkReport, setCurrentWorkReport ] = useState({} as WorkReportTypes);
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

  const tableObject = [
  {
    columnName: "Reporter",
    key: "supervisorName",
    type: "text"
  },
  {
    columnName: "Site Name",
    key: "siteName",
    type: "text"
  },
  {
    columnName: "Date",
    key: "date",
    type: "date"
  }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    allWorkReport();
  };

  const editWorkReport = (obj: WorkReportTypes) => {
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
                        {columnObj.type === 'date' ? moment(rowObj[columnObj.key]).format('DD/MM/YYYY') : rowObj[columnObj.key]}
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
        <WorkReportForms handleClose={handleClose} currentWorkReport={currentWorkReport}></WorkReportForms>
      </ModalComponent>
    </>
  );
};
