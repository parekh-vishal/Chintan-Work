// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import { Formik } from "formik";
import * as React from "react";
import { Container, Row, Col, Navbar, Nav, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
import { setUser } from "../../Actions";
import { post } from "../../Utils/WebRequestUtil";
// import { IAppState } from "../../Reducers/rootReducer";

// interface IState {}

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    actionResult: state.default
  };
};

class LoginPage extends React.PureComponent<any, {}> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.DefaultActionCreator();
  }

  onSubmit = async (values: any) => {
    // e.preventDefault();
    const { firstName, lastName, email, contactNo, password } = values;
    console.log(firstName, lastName, email, contactNo, password);

    const submitdata = await post({ url: 'admin/SignIn', body: { email, password } })
    this.props.setUser(submitdata.data);
    submitdata.data.message && this.navigateToDashboadPage();
  }

  navigateToDashboadPage = () => {
    this.props.history.push('/');
  }

  public render() {
    return <Container fluid >
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <h1>Login</h1>
          <hr />
          <Formik
            initialValues={{
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


                  <Form.Group controlId="email">
                    <Form.Row>
                      <Form.Label column lg={2}>Email address</Form.Label>
                      <Col>
                        <Form.Control type="email" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                        <Form.Text className="text-danger">{errors.email}</Form.Text>
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

                  <Button variant="primary" type="submit">
                    Submit
            </Button>
                </Form>)}
          </Formik>
        </Col>
      </Row>

    </Container>;;
  }
}

const mapDispatchToProps ={
  DefaultActionCreator:DefaultActionCreator.action,
  setUser: setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
