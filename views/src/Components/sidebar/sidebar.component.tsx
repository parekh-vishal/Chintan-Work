import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router";
import { useRouteMatch, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";
import './sidebar.component.scss'

const Side = (props: any) => {
  let { url } = useRouteMatch();
  const location = useLocation();
  return (
    <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey={location.pathname}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.SITES}`}>
            <FontAwesomeIcon icon={ faHome }/>
            sites
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.WORK_REPORT}`}>Work Report</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.EXPENSE}`}>Expense</Nav.Link>
        </Nav.Item>
      </Nav>

    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar