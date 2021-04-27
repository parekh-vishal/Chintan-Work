import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/async";
import { getAllSites, getAllWorkReport } from "../../../services";
import './work-report-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import WorkReportForms from "../../Forms/work-report-forms/work-report-forms.component";
import { IWorkReportTypes } from "../../../typings";
import { PaginationComponent } from "../../pagination/pagination.component";
export const WorkReportListing = (props: any) => {

  var [listData, setListData] = useState([] as Array<IWorkReportTypes>);
  var [currentWorkReport, setCurrentWorkReport] = useState({} as IWorkReportTypes);
  const [allSite, setAllSite] = useState([] as Array<{}>);
  const [SiteId, setSiteId] = useState("");
  const [isReadOnly, setReadOnlyFlag] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedSite, setSelectedSite] = useState({} as any);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const allSites = async (siteName: String) => {
    const respond = await getAllSites({ siteName });

    if (respond.data && respond.data.length) {
      const sitesOptions: Array<{}> = [];
      for (let index = 0; index < respond.data[0].data.length; index++) {
        const element = respond.data[0].data[index];
        sitesOptions.push({
          value: element.siteId,
          label: element.siteName
        });
      }
      // console.log('siteName', selectedSite.value);
      !selectedSite.value && setSelectedSite(sitesOptions[0]);
      const selectedSiteId = Object.values(sitesOptions[0])[0] as String;
      // console.log('selectedSiteId',selectedSiteId)
      !selectedSite.value && allWorkReport(1, selectedSiteId);
      setAllSite(sitesOptions);
      // if(onload){
      //   allWorkReport(respond.data[0].data[0]?.siteId || "");
      // }
    }
  };
  const loadOptions = (siteName: String, callback?: any) => {
    callback(allSite);
  };
  const setsiteId = (siteid: any) => {
    setSiteId(siteid.value);
    allWorkReport(1, siteid.value);
    //console.log("siteID obj",siteid)
    setSelectedSite(siteid)
  }
  const allWorkReport = async (page: number, siteId: String) => {
    if (page) {
      setCurrentPage(page);
    }
    else {
      page = currentPage;
    }
    const setSite = selectedSite.value as String;
    !siteId ? siteId = setSite : siteId = siteId
    const allWorkReportRespond = await getAllWorkReport({ siteId, page });
    if (allWorkReportRespond && allWorkReportRespond.data[0] && allWorkReportRespond.data[0].data.length) {
      const totalPage = Math.ceil((allWorkReportRespond.data[0].count) / 10);
      setListData(allWorkReportRespond.data[0].data);
      setTotalPage(totalPage);
    }
    else {
      setListData([]);
    }
    //setListData([]);
  }

  useEffect(() => {
    allSites('');
    // allWorkReport(selectedSite.value);
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
      view: (rowObj: any, text: any) => (<Button variant="link" onClick={() => viewWorkReport(rowObj)}>{text}</Button>),
    },
    {
      columnName: "Reporter",
      key: "supervisorName",
      type: "text",
      view: (rowObj: any, text: any) => (<h6>{text}</h6>),
    },
    {
      columnName: "Site Name",
      key: "siteName",
      type: "text",
      view: (rowObj: any, text: any) => (<h6>{text}</h6>),
    },
    {
      columnName: "Date",
      key: "date",
      type: "date",
      view: (rowObj: any, text: any) => (moment(text).format('DD/MM/YYYY')),
    }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setReadOnlyFlag(false);
    setCurrentWorkReport({} as IWorkReportTypes);
    allWorkReport(currentPage, SiteId);
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
          <Col><h5 className="float-left">Select Site: </h5>
            <AsyncSelect value={selectedSite} onInputChange={allSites} defaultOptions={allSite} loadOptions={loadOptions} onChange={(val) => { setsiteId(val) }}></AsyncSelect>
          </Col>
        </Row>
        <Row>
          <Col>
            {(listData.length === 0) ? <p>Records Not Found</p> : <Fragment><Table striped bordered hover size="sm">
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
                      {tableObject.length - 1 === index &&
                        <Fragment>
                          <Button variant="link" className="float-right" onClick={() => { editWorkReport(rowObj) }}>Edit</Button>
                        </Fragment>
                      }
                    </td>)
                    )}
                  </tr>
                ))
                }
              </tbody>
            </Table>
              <PaginationComponent totalPages={totalPage} changePage={allWorkReport}></PaginationComponent>
            </Fragment>
            }
          </Col>
        </Row>
      </Container>
      <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show} size="xl">
        <WorkReportForms handleClose={handleClose} currentWorkReport={currentWorkReport} isReadOnly={isReadOnly}></WorkReportForms>
      </ModalComponent>
    </>
  );
};
