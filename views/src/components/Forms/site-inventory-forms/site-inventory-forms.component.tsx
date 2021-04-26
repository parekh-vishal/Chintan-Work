import React, { Component } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import AsyncSelect from "react-select/async";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllSites, addNewSiteInventory, editSiteInventory } from "../../../services";
import "./site-inventory-forms.component.tsx"
import { Formik, FormikValues } from "formik";
import { UserTypes, ISiteInventoryTypes } from "../../../typings";
import moment from "moment";
import { connect } from "react-redux";

export interface IProps {
    handleClose: any;
    user: UserTypes;
    currentSiteInventory?: ISiteInventoryTypes;
    isReadOnly: boolean;
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    };
};

class SiteInventoryForms extends Component<IProps, any>{
    public constructor(props: any) {
        super(props);

        const siteInventoryFormsObj: ISiteInventoryTypes = this.getSiteInventoryFormObject();
        this.state = {
            initialValues : siteInventoryFormsObj
        }
    }
    getSiteInventoryFormObject = () => {
        if (this.props.currentSiteInventory && this.props.currentSiteInventory._id) {
            return {
                metId: this.props.currentSiteInventory.metId,
                siteObject: {
                    value: this.props.currentSiteInventory.siteId,
                    label: this.props.currentSiteInventory.siteName,
                  },
                siteId: this.props.currentSiteInventory.siteId,
                siteName : this.props.currentSiteInventory.siteName,
                supervisorName: this.props.currentSiteInventory.supervisorName,
                materialType: this.props.currentSiteInventory.materialType,
                materialUnit: this.props.currentSiteInventory.materialUnit,
                materialTotalQuantity: this.props.currentSiteInventory.materialTotalQuantity,
                pricePerUnit: this.props.currentSiteInventory.pricePerUnit,
                invoicePrice: this.props.currentSiteInventory.invoicePrice,
                invoiceNo: this.props.currentSiteInventory.invoiceNo,
                remarks: this.props.currentSiteInventory.remarks,
                supplier: this.props.currentSiteInventory.supplier,
                date: moment(this.props.currentSiteInventory.date).toDate()
            }
        }
        else {
            return {
                supervisorName: "",
                materialType: "",
                materialUnit: "",
                materialTotalQuantity: 0,
                pricePerUnit: 0,
                invoicePrice: 0,
                invoiceNo: "",
                remarks: "",
                supplier: "",
                date: moment().toDate()
            }
        }
    }
    loadOptions = (siteName?:String, callback?:any)=>{
        callback(this.state.allSitesAsOption);
      };
    public componentDidMount() {
        this.allSites();
    };
    allSites = async (siteName?: String) => {
        const respond = await getAllSites({ siteName });
        if (respond.data && respond.data.length != 0) {
            const sitesOptions: Array<{}> = [];
            for (let index = 0; index < respond.data[0].data.length; index++) {
                const element = respond.data[0].data[index];
                sitesOptions.push({
                    value: element.siteId,
                    label: element.siteName
                });
            }
            this.setState({
                allSitesAsOption: sitesOptions,
                siteRespond: respond.data
            });
        }
    }
    validateForm = (values: FormikValues) => {
        const errors: any = {};
        if (!values.siteObject.value) {
            errors.siteName = 'Required';
        }

        if (!values.date) {
            errors.date = 'Required';
        }

        if(!values.materialType){
            errors.materialType = 'Required';
        }

        if(!values.materialUnit){
            errors.materialUnit = 'Required';
        }

        if(!values.materialTotalQuantity){
            errors.materialTotalQuantity = 'Required';
        }

        if(!values.invoicePrice){
            errors.invoicePrice = 'Required';
        }
        return errors;
    }
    submitEvent = async (values: FormikValues) => {
        const {
            date,
            siteObject,
            materialType,
            materialUnit,
            materialTotalQuantity,
            pricePerUnit,
            invoicePrice,
            invoiceNo,
            remarks,
            supplier
        } = values;

        const newSiteInventoryData: ISiteInventoryTypes = {
            date,
            siteId: siteObject.value,
            siteName: siteObject.label,
            supervisorName: `${this.props.user.firstName}${this.props.user.lastName}`,
            materialType,
            materialUnit,
            materialTotalQuantity,
            pricePerUnit,
            invoicePrice,
            invoiceNo,
            remarks,
            supplier
        };

        const siteInventoryCreated = await ((this.props.currentSiteInventory && this.props.currentSiteInventory._id) ? editSiteInventory({ ...newSiteInventoryData, _id: this.props.currentSiteInventory._id, metId: this.props.currentSiteInventory.metId }) : addNewSiteInventory(newSiteInventoryData));

        if (siteInventoryCreated && siteInventoryCreated.data) {
            this.props.handleClose();
        }
    };

    public render() {
        const {
            isReadOnly,
            currentSiteInventory
        } = this.props;
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>{`${isReadOnly ? 'View' : (currentSiteInventory && currentSiteInventory.metId) ? 'Edit' : 'New'} Site Inventory`}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={this.state.initialValues}
                    validate={this.validateForm}
                    onSubmit={this.submitEvent}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                        /* and other goodies */
                    }) => (

                        <Form onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group controlId="siteObject">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Site</Form.Label>
                                        <Col>
                                            <AsyncSelect cacheOptions onInputChange={this.allSites} defaultOptions={this.state.allSitesAsOption} loadOptions={this.loadOptions} value={values.siteObject} onChange={(val) => { setFieldValue('siteObject', val)}} isDisabled={isReadOnly}></AsyncSelect>
                                            <Form.Text className="text-danger">{errors.siteName}</Form.Text>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="ownerName">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Date</Form.Label>
                                        <Col>
                                            <DatePicker selected={values.date} onChange={(date) => setFieldValue('date', date)} readOnly={isReadOnly} />
                                            <Form.Text className="text-danger">{errors.date}</Form.Text>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="invoiceNo">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Invoice Number</Form.Label>
                                        <Col>
                                            <Form.Control type="string" placeholder="Enter Invoie Number" onChange={handleChange} name="invoiceNo" onBlur={handleBlur} value={values.invoiceNo} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="materialType">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Material Name</Form.Label>
                                        <Col>
                                            <Form.Control type="string" placeholder="Enter Material  Name" onChange={handleChange} name="materialType" onBlur={handleBlur} value={values.materialType} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="materialUnit">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Material Unit</Form.Label>
                                        <Col>
                                            <Form.Control type="string" placeholder="Enter Material  Unit" onChange={handleChange} name="materialUnit" onBlur={handleBlur} value={values.materialUnit} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="materialTotalQuantity">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Material Quantity</Form.Label>
                                        <Col>
                                            <Form.Control type="number" placeholder="Enter Material  Quantity" onChange={handleChange} name="materialTotalQuantity" onBlur={handleBlur} value={values.materialTotalQuantity} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="pricePerUnit">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Per Unit Price</Form.Label>
                                        <Col>
                                            <Form.Control type="number" placeholder="Enter Price Per Unit" onChange={handleChange} name="pricePerUnit" onBlur={handleBlur} value={values.pricePerUnit} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="invoicePrice">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Invoice Price</Form.Label>
                                        <Col>
                                            <Form.Control type="number" placeholder="Enter Invoice Price" onChange={handleChange} name="invoicePrice" onBlur={handleBlur} value={values.invoicePrice} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="supplier">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Supplier</Form.Label>
                                        <Col>
                                            <Form.Control type="string" placeholder="Enter Supplier Name" onChange={handleChange} name="supplier" onBlur={handleBlur} value={values.supplier} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                                <Form.Group controlId="remarks">
                                    <Form.Row>
                                        <Form.Label column lg={2}>Remarks</Form.Label>
                                        <Col>
                                            <Form.Control type="string" placeholder="Enter Remarks" onChange={handleChange} name="remarks" onBlur={handleBlur} value={values.remarks} readOnly={isReadOnly} />
                                        </Col>
                                    </Form.Row>
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                                {!isReadOnly && <Button variant="primary" type="Submit">Create</Button>}
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </>
        );
    }
};

export default connect(mapStateToProps, {})(SiteInventoryForms);