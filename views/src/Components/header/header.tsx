import * as React from "react";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// export interface IProps {}
// interface IState {}

export class HeaderComponent extends React.PureComponent<{}, {}> {
  public constructor(props: {}) {
    super(props);
  }

  public render() {
    return <Navbar bg="light" expand="lg">
    <Navbar.Brand href="/">Digital 1</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-md-end">
      <Nav>
        <Nav.Link href="/">Add User</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
  }
}