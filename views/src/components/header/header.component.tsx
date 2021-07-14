import * as React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import './header.component.scss';
export class HeaderComponent extends React.PureComponent<any, {}> {
  public constructor(props: any) {
    super(props);
  }

  logout = () => {
    this.props.logoutHandler();
  }

  public render() {
    return <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/"><a href="/"><img src="../logo.jpg" style={{height:"55px"}}/></a></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-end">
      <Nav>
        {/* <Nav.Link href="/signup">Add User</Nav.Link> */}
        <NavDropdown title={this.props.user?.firstName || ""} id="basic-nav-dropdown">
          <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
  }
}