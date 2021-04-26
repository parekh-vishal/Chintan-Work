import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faRupeeSign, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router";
import { useRouteMatch, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";
import './sidebar.component.scss'

const Side = (props: any) => {
  let { url } = useRouteMatch();
  const location = useLocation();
  console.log('location.pathname', location.pathname)
  return (
    <>
      <Nav className="col-md-12 d-md-block bg-light sidebar"
        activeKey={location.pathname}
      >        
     
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.SITES}`}>
            <FontAwesomeIcon icon={ faHome }/>
            {` sites`}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.WORK_REPORT}`}>
            <FontAwesomeIcon icon={ faFileAlt }/>
            {` Work Report`}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.SITE_INVENTORY}`}>
            <FontAwesomeIcon icon={ faWarehouse}/>
            {` Materials`}
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.EXPENSE}`}>
            <FontAwesomeIcon icon={ faRupeeSign }/>
            {` Expense`}
          </Nav.Link>
        </Nav.Item>
      </Nav>

    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar