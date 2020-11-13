import React from "react";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";
import './sidebar.component.scss'

const Side = (props: any) => {

  return (
    <>
      <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/sites"
        onSelect={selectedKey => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/sites">sites</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/workReport">Work Report</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/expense">Expense</Nav.Link>
        </Nav.Item>
      </Nav>

    </>
  );
};
const Sidebar = withRouter(Side);
export default Sidebar