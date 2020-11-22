import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites } from "../../../services";
import './sites-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import { SitesForms } from "../../Forms";

export const SitesListing = (props: any) => {
 
  var [ listData, setListData ] = useState([] as any);
  const [show, setShow] = useState(false);

  const allSites = async () => {
    const allSitesRespond = await getAllSites();
    if(allSitesRespond.data){
      setListData(allSitesRespond.data);
    }
  }

  useEffect( () => {
    allSites();
  }, []);

  const tableObject = [{
    columnName: "Site Name",
    key: "siteName",
    type: "text"
  },
  {
    columnName: "Owner Name",
    key: "ownerName",
    type: "text"
  },
  {
    columnName: "Start Date",
    key: "siteInaugurationDate",
    type: "date"
  },
  {
    columnName: "Complete Date",
    key: "tentativeDeadline",
    type: "date"
  }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    allSites();
  };

  return (
    <>
      <Container fluid>
        <Row className="add-buttton-row">
          <Col>
            <h3 className="float-left">Sites</h3>
            <Button variant="outline-primary" size="sm" className="float-right" onClick={handleShow}>Add Site</Button>
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
                  <tr key={rowObj.siteId}>
                    {tableObject.map(columnObj => 
                      (<td key={columnObj.columnName}>
                        {columnObj.type === 'date' ? moment(rowObj[columnObj.key]).format('DD/MM/YYYY') : rowObj[columnObj.key]}
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
      <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show}>
        <SitesForms handleClose={handleClose}></SitesForms>
      </ModalComponent>
    </>
  );
};
