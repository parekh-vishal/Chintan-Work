import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites } from "../../../services";
import './sites-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import { SitesForms, SitesSettings } from "../../Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

export const SitesListing = (props: any) => {
 
  const MODAL_NAMES = {
    CREATE_SITE: "CREATE_SITE",
    SITE_SETTINGS: "SITE_SETTINGS"
  }

  const [ listData, setListData ] = useState([] as any);
  const [show, setShow] = useState(false);
  const [modalName, setModalName] = useState("");

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

  const openModal = (modalString: any) => {
    setModalName(modalString);
    handleShow();
  }

  return (
    <>
      <Container fluid>
        <Row className="add-buttton-row">
          <Col>
            <h3 className="float-left">Sites</h3>
            <Button variant="outline-primary" size="sm" className="float-right" onClick={openModal.bind(null, MODAL_NAMES.CREATE_SITE)}>Add Site</Button>
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
                    {tableObject.map((columnObj, index: number) => 
                      (<td key={columnObj.columnName}>
                        {columnObj.type === 'date' ? moment(rowObj[columnObj.key]).format('DD/MM/YYYY') : rowObj[columnObj.key]}
                        {tableObject.length-1 === index && 
                          <Button variant="outline-primary" size="sm" className="float-right" onClick={openModal.bind(null, MODAL_NAMES.SITE_SETTINGS)}>
                            <FontAwesomeIcon icon={ faCog } />
                          </Button>
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
      <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show}>
        {modalName === MODAL_NAMES.CREATE_SITE && 
          <SitesForms handleClose={handleClose}></SitesForms>
        }
        {modalName === MODAL_NAMES.SITE_SETTINGS && 
          <SitesSettings handleClose={handleClose}></SitesSettings>
        }
      </ModalComponent>
    </>
  );
};
