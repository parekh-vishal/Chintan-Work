// This Page is Skeleton of React Structure for Web Development
// If you want to make other page, Copy and Refactor this page.

import * as React from "react";
import { Button, Col, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import axios from 'axios';

import { Formik } from 'formik';
import * as DefaultActionCreator from "../../ActionCreators/_DefaultActionCreator";
// import { IAppState } from "../../Reducers/rootReducer";
import "./signup.scss"

export interface IProps {
  dispatch: Dispatch<any>;
}

interface signupStates {
  firstName: string;
  lastName: string;
  contactNo: number;
  email: string;
  password: string;
}

// interface IState {}

const mapStateToProps = (state: any) => {
  return {
    actionResult: state.default
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
    this.props.dispatch(DefaultActionCreator.action());
  }

  onSubmit = (values: any) => {
    // e.preventDefault();
    const { firstName, lastName, email, contactNo, password } = values;
    console.log(firstName, lastName, email, contactNo, password);

    axios.post('http://localhost:3000/admin/SignUp', { firstName, lastName, email, contactNo, password })
      .then((result) => {
        console.log(result);
    });
  }

  public render() {
    //const { firstName, lastName, email, contactNo, password } = this.state;

    return <div className="signup-form">
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
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Row>
                  <Form.Label column lg={2}>Last name</Form.Label>
                  <Col>
                    <Form.Control type="text" placeholder="Enter Last name" onChange={handleChange} onBlur={handleBlur} value={values.lastName}/>
                  </Col>
                </Form.Row>
              </Form.Group>


              <Form.Group controlId="email">
                <Form.Row>
                  <Form.Label column lg={2}>Email address</Form.Label>
                  <Col>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleChange} onBlur={handleBlur} value={values.email}/>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group controlId="contactNo">
                <Form.Row>
                  <Form.Label column lg={2}>Contact No</Form.Label>
                  <Col>
                    <Form.Control type="number" placeholder="Enter Contact No" onChange={handleChange} onBlur={handleBlur} value={values.contactNo}/>
                  </Col>
                </Form.Row>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Row>
                  <Form.Label column lg={2}>Password</Form.Label>
                  <Col>
                    <Form.Control type="password" placeholder="Password" onChange={handleChange} onBlur={handleBlur} value={values.password}/>
                  </Col>
                </Form.Row>
              </Form.Group>
              <Button variant="secondary">
                Cancel
              </Button>{' '}
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>)}
          </Formik>
    </div>;
  }
}

export default connect(mapStateToProps)(SignupPage);
