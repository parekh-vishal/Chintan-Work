import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { getAllSites } from "../../../services";
import './sites-listing.component.scss'
import moment from "moment";
import { ModalComponent } from "../..";
import { SitesForms, WorkCategory } from "../../Forms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { SiteType } from "../../../typings";
import SitesSettings from "../../Forms/sites-settings/sites-settings.component"
import { useSelector } from "react-redux";
import { COMMON } from "../../../constants";

interface TableObject {
  columnName: string;
  key: string;
  type: string;
  view: Function;
}

export const SitesListing = (props: any) => {

  const user = useSelector((state:any) => state.user)
  const MODAL_NAMES = {
    CREATE_SITE: "CREATE_SITE",
    SITE_SETTINGS: "SITE_SETTINGS",
    WORK_CATEGORY: "WORK_CATEGORY"
  }

  const [listData, setListData] = useState([] as Array<SiteType>);
  const [show, setShow] = useState(false);
  const [isReadOnly, setReadOnlyFlag] = useState(false);
  const [modalName, setModalName] = useState("");
  const [currentSite, setCurrentSite] = useState({} as SiteType);

  const allSites = async () => {
    const allSitesRespond = await getAllSites();
    if (allSitesRespond.data) {
      setListData(allSitesRespond.data);
    }
  }

  useEffect(() => {
    allSites();
  }, []);

  const tableObject: Array<TableObject> = [{
    columnName: "Site Name",
    key: "siteName",
    type: "text",
    view: (rowObj:any, text: any) => (<Button variant="link" onClick={() => viewSite(rowObj)}>{text}</Button>),
  },
  {
    columnName: "Owner Name",
    key: "ownerName",
    type: "text",
    view: (rowObj:any, text: any) => (<h6>{text}</h6>),
  },
  {
    columnName: "Start Date",
    key: "siteInaugurationDate",
    type: "date",
    view: (rowObj:any, text: any) => (moment(text).format('DD/MM/YYYY')),
  },
  {
    columnName: "Complete Date",
    key: "tentativeDeadline",
    type: "date",
    view: (rowObj:any, text: any) => (moment(text).format('DD/MM/YYYY')),
  }];

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setReadOnlyFlag(false);
    allSites();
  };

  const openModal = (modalString: any) => {
    setModalName(modalString);
    handleShow();
  }

  const openSiteSetting = (siteObject: SiteType) => {
    setCurrentSite(siteObject);
    openModal(MODAL_NAMES.SITE_SETTINGS);
  }

  const editSite = (siteObject: SiteType) => {
    setCurrentSite(siteObject);
    openModal(MODAL_NAMES.CREATE_SITE);
  }

  const viewSite = (siteObject: SiteType) => {
    setReadOnlyFlag(true);
    setCurrentSite(siteObject);
    openModal(MODAL_NAMES.CREATE_SITE);
  }

  return (
    <>
      <Container fluid>
        <Row className="add-buttton-row">
          <Col>
            <h3 className="float-left">Sites</h3>
            {user.userType == COMMON.SUPER_USER && <Button variant="outline-primary" size="sm" className="float-right" onClick={openModal.bind(null, MODAL_NAMES.WORK_CATEGORY)}>Manage Category</Button> }
            {user.userType == COMMON.SUPER_USER && <Button variant="outline-primary" size="sm" className="float-right add-site-btn" onClick={() => { setCurrentSite({} as SiteType); openModal(MODAL_NAMES.CREATE_SITE) }}>Add Site</Button>}
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
                    {tableObject.map((columnObj: any, index: number) =>
                      (<td key={columnObj.columnName}>
                        {columnObj.view(rowObj, rowObj[columnObj.key])}
                        {tableObject.length - 1 === index &&
                          <Fragment>
                            <Button variant="outline-primary" size="sm" className="float-right" onClick={() => openSiteSetting(rowObj)}>
                              <FontAwesomeIcon icon={faCog} />
                            </Button>
                            <Button variant="link" className="float-right" onClick={() => editSite(rowObj)}>Edit</Button>
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
      <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show}>
        {modalName === MODAL_NAMES.CREATE_SITE &&
          <SitesForms handleClose={handleClose} currentSite={currentSite} isReadOnly={isReadOnly}></SitesForms>
        }
        {modalName === MODAL_NAMES.SITE_SETTINGS &&
          <SitesSettings handleClose={handleClose} currentSite={currentSite}></SitesSettings>
        }
        {modalName === MODAL_NAMES.WORK_CATEGORY &&
          <WorkCategory handleClose={handleClose}></WorkCategory>
        }
      </ModalComponent>
    </>
  );
};
