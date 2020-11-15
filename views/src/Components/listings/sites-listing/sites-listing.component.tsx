import { FormikValues, useFormik } from "formik";
import React, { useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './sites-listing.component.scss'

export const SitesListing = (props: any) => {

  const siteFormsObj = {
    siteName: '',
    ownerName: '',
    ownerContactNo: '',
    siteAddress: {
      AddressLine1: '',
      City: '',
      State: '',
      pincode: '',
    },
    siteInaugurationDate: new Date(),
    siteEstimate: '',
    tentativeDeadline: new Date(),
    siteSupervisor: '',
    siteSupervisorNo: '',
    siteSupervisorId: '',
  }
  const [show, setShow] = useState(false);
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submitEvent = () => {

  }

  const validateForm = (values: FormikValues) => {
    const errors: any = {...siteFormsObj};
    if (!values.siteName) {
      errors.siteName = 'Required';
    }

    if (!values.ownerName) {
      errors.ownerName = 'Required';
    }

    if (!values.ownerContactNo) {
      errors.ownerContactNo = 'Required';
    }

    if (!values.siteAddress.AddressLine1) {
      errors.siteAddress.AddressLine1 = 'Required';
    }

    if (!values.siteAddress.City) {
      errors.siteAddress.City = 'Required';
    }

    if (!values.siteAddress.State) {
      errors.siteAddress.State = 'Required';
    }

    if (!values.siteInaugurationDate) {
      errors.siteInaugurationDate = 'Required';
    }

    if (!values.siteEstimate) {
      errors.siteEstimate = 'Required';
    }

    if (!values.tentativeDeadline) {
      errors.tentativeDeadline = 'Required';
    }

    return errors;
  }

  const formik1 = useFormik({
    initialValues: siteFormsObj,
    onSubmit: submitEvent,
    validate: validateForm
  });

  return (
    <>
      <Container fluid>
        <Row className="add-buttton-row">
          <Col>
            <Button variant="outline-primary" size="sm" className="float-right" onClick={handleShow}>Add Site</Button>
          </Col>
        </Row>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Site</Modal.Title>
        </Modal.Header>
        <Form onSubmit={formik1.handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="siteName">
              <Form.Row>
                <Form.Label column lg={2}>Site Name</Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Enter Site Name" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteName} />
                  <Form.Text className="text-danger">{formik1.errors.siteName}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="ownerName">
              <Form.Row>
                <Form.Label column lg={2}>Owner Name</Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Enter Owner Name" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.ownerName} />
                  <Form.Text className="text-danger">{formik1.errors.ownerName}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="ownerContactNo">
              <Form.Row>
                <Form.Label column lg={2}>Owner Contract No</Form.Label>
                <Col>
                  <Form.Control type="number" placeholder="Enter Owner Contract No" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.ownerContactNo} />
                  <Form.Text className="text-danger">{formik1.errors.ownerContactNo}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="AddressLine1">
              <Form.Row>
                <Form.Label column lg={2}>Address</Form.Label>
                <Col>
                  <Form.Control name="siteAddress.AddressLine1" as="textarea" placeholder="Enter site address" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteAddress.AddressLine1} />
                  <Form.Text className="text-danger">{formik1.errors.siteAddress?.AddressLine1}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="City">
              <Form.Row>
                <Form.Label column lg={2}>City</Form.Label>
                <Col>
                  <Form.Control name="siteAddress.City" type="text" placeholder="Enter City" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteAddress.City} />
                  <Form.Text className="text-danger">{formik1.errors.siteAddress?.City}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="State">
              <Form.Row>
                <Form.Label column lg={2}>State</Form.Label>
                <Col>
                  <Form.Control type="text" name="siteAddress.State" placeholder="Enter State" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteAddress.State} />
                  <Form.Text className="text-danger">{formik1.errors.siteAddress?.State}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>



            <Form.Group controlId="pincode">
              <Form.Row>
                <Form.Label column lg={2}>Pincode</Form.Label>
                <Col>
                  <Form.Control type="text" name="siteAddress.pincode" placeholder="Enter Pincode" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteAddress.pincode} />
                  <Form.Text className="text-danger">{formik1.errors.siteAddress?.pincode}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="siteInaugurationDate">
              <Form.Row>
                <Form.Label column lg={2}>Start Date</Form.Label>
                <Col>
                  <DatePicker selected={formik1.values.siteInaugurationDate} onChange={(date) =>formik1.setFieldValue('siteInaugurationDate',date)} />
                  {/* <Form.Text className="text-danger">{formik1.errors.siteInaugurationDate}</Form.Text> */}
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="siteEstimate">
              <Form.Row>
                <Form.Label column lg={2}>Estimate</Form.Label>
                <Col>
                  <Form.Control type="text" placeholder="Enter Estimate" onChange={formik1.handleChange} onBlur={formik1.handleBlur} value={formik1.values.siteEstimate} />
                  <Form.Text className="text-danger">{formik1.errors.siteEstimate}</Form.Text>
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group controlId="tentativeDeadline">
              <Form.Row>
                <Form.Label column lg={2}>Deadline</Form.Label>
                <Col>
                  <DatePicker selected={formik1.values.tentativeDeadline} onChange={(date) =>formik1.setFieldValue('tentativeDeadline',date)} />
                  {/* <Form.Text className="text-danger">{formik1.errors.tentativeDeadline}</Form.Text> */}
                </Col>
              </Form.Row>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
                </Button>
            <Button variant="primary">Create</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
