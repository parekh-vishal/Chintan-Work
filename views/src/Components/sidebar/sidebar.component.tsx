import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import { useRouteMatch } from "react-router-dom";
import { ROUTES } from "../../constants";
import './sidebar.component.scss'

const Side = (props: any) => {
  let { url } = useRouteMatch();
  return (
    <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey={`${url}${ROUTES.SITES}`}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href={`${url}${ROUTES.SITES}`}>sites</Nav.Link>
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