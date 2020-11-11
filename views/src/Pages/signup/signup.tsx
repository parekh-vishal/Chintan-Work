
import * as React from "react";
import { Button, Col, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Formik } from 'formik';
import "./signup.scss"
import { signUp } from "../../services";
import { SignUpTypes } from "../../typings";

export interface IProps {
  dispatch: Dispatch<any>;
  history: any;
  location: any;
  user: any;
}

interface signupStates {
  firstName: string;
  lastName: string;
  contactNo: number;
  email: string;
  password: string;
}

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default,
    user: state.user
  };
};

class SignupPage extends React.PureComponent<IProps, signupStates> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      firstName: 'asdasd',
      lastName: '',
      contactNo: 0,
      email: '',
      password: ''
    };

  }


  public componentDidMount() {
    if(this.props.user.USER && this.props.user.USER.token){
      this.navigateToDashboadPage();
    }
  }

  navigateToDashboadPage = () => {
    this.props.history.push('/');
  }

  onSubmit = async (values: SignUpTypes) => {
    const { firstName, lastName, email, contactNo, password } = values;

    const submitdata = await signUp({firstName, lastName, email, contactNo, password})

    alert(submitdata.data.message);
    this.navigateToLoginPage();
  }

  navigateToLoginPage = () => {
    this.props.history.push('/login');
  }

  public render() {

    return <Container fluid >
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav.Link href="/login">Login</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs lg="6">

          <h1>Sign Up</h1>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              contactNo: 0,
              email: '',
              password: ''
            }}
            validate={values => {
              const errors: any = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              if (!values.firstName) {
                errors.firstName = 'Required';
              }

              if (!values.lastName) {
                errors.lastName = 'Required';
              }

              if (!values.contactNo) {
                errors.contactNo = 'Required';
              }

              if (!values.password) {
                errors.password = 'Required';
              } else if (values.password.length < 6) {
                errors.password = 'Password should be at least 6 character.';
              }

              return errors;
            }}
            onSubmit={this.onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="firstName">
                    <Form.Row>
                      <Form.Label column lg={2}>First name</Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Enter First name" onChange={handleChange} onBlur={handleBlur} value={values.firstName} />
                        <Form.Text className="text-danger">{errors.firstName}</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>

                  <Form.Group controlId="lastName">
                    <Form.Row>
                      <Form.Label column lg={2}>Last name</Form.Label>
                      <Col>
                        <Form.Control type="text" placeholder="Enter Last name" onChange={handleChange} onBlur={handleBlur} value={values.lastName} />
                        <Form.Text className="text-danger">{errors.lastName}</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>


                  <Form.Group controlId="email">
                    <Form.Row>
                      <Form.Label column lg={2}>Email address</Form.Label>
                      <Col>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        <Form.Text className="text-danger">{errors.email}</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>

                  <Form.Group controlId="contactNo">
                    <Form.Row>
                      <Form.Label column lg={2}>Contact No</Form.Label>
                      <Col>
                        <Form.Control type="number" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.contactNo} />
                        <Form.Text className="text-danger">{errors.contactNo}</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Row>
                      <Form.Label column lg={2}>Password</Form.Label>
                      <Col>
                        <Form.Control type="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                        <Form.Text className="text-danger">{errors.password}</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Button variant="secondary" onClick={this.navigateToLoginPage}>
                    Cancel
              </Button>{' '}
                  <Button variant="primary" type="submit">
                    Submit
              </Button>
                </Form>)}
          </Formik>
        </Col>
      </Row>

    </Container>;
  }
}

export default connect(mapStateToProps)(SignupPage);
