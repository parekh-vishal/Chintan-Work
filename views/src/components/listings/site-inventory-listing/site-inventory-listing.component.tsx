import React, { Fragment, useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import AsyncSelect from "react-select/async";
import { getAllSites, getAllSiteInventory } from "../../../services";
import './site-inventory-listing.component.scss'
import moment from "moment";
import SiteInventoryForms from '../../Forms/site-inventory-forms/site-inventory-forms.component'
import { ModalComponent } from "../..";
import { ISiteInventoryTypes } from "../../../typings";
import { PaginationComponent } from "../../pagination/pagination.component";

export const SiteInventoryListing = (props: any) => {
    var [listData, setListData] = useState([] as Array<ISiteInventoryTypes>);
    var [currentSiteInventory, setcurrentSiteInventory] = useState({} as ISiteInventoryTypes);
    const [allSite, setAllSite] = useState([] as Array<{}>);
    const [SiteId, setSiteId] = useState("");
    const [isReadOnly, setReadOnlyFlag] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedSite, setSelectedSite] = useState({} as any);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const allSites = async (siteName: String) => {
        const respond = await getAllSites({ siteName });
        if (respond.data && respond.data.length) {
            const sitesOptions: Array<{}> = [];
            for (let index = 0; index < respond.data[0].data.length; index++) {
                const element = respond.data[0].data[index];
                sitesOptions.push({
                    value: element.siteId,
                    label: element.siteName
                });
            }
            !selectedSite.value && setSelectedSite(sitesOptions[0]);
            const selectedSiteId = Object.values(sitesOptions[0])[0] as String;
            !selectedSite.value && allSiteInventory(1, selectedSiteId);
            setAllSite(sitesOptions);
        }
    };
    const loadOptions = (siteName: String, callback?: any) => {
        callback(allSite);
    };
    const setsiteId = (siteid: any) => {
        setSiteId(siteid.value);
        //allWorkReport(1,siteid.value);
        setSelectedSite(siteid)
    };
    const allSiteInventory = async (page: number, siteId: String) => {
        if (page) {
            setCurrentPage(page);
        }
        else {
            page = currentPage;
        }
        const setSite = selectedSite.value as String;
        !siteId ? siteId = setSite : siteId = siteId
        const allSiteInventoryResponse = await getAllSiteInventory({ siteId, page });
        if (allSiteInventoryResponse && allSiteInventoryResponse.data[0] && allSiteInventoryResponse.data[0].data.length) {
            const totalPage = Math.ceil((allSiteInventoryResponse.data[0].count) / 10);
            setListData(allSiteInventoryResponse.data[0].data);
            setTotalPage(totalPage);
        }
        else {
            setListData([]);
        }
    }
    useEffect(() => {
        allSites('');
    }, []);
    const viewWorkReport = (inventoryObject: ISiteInventoryTypes) => {
        setReadOnlyFlag(true);
        setcurrentSiteInventory(inventoryObject);
        handleShow();
    };

    const tableObject = [
        {
            columnName: "Id",
            key: "metId",
            type: "text",
            view: (rowObj: any, text: any) => (<Button variant="link" onClick={() => viewWorkReport(rowObj)}>{text}</Button>),
        },
        {
            columnName: "Reporter",
            key: "supervisorName",
            type: "text",
            view: (rowObj: any, text: any) => (<h6>{text}</h6>),
        },
        {
            columnName: "Site Name",
            key: "siteName",
            type: "text",
            view: (rowObj: any, text: any) => (<h6>{text}</h6>),
        },
        {
            columnName: "Date",
            key: "date",
            type: "date",
            view: (rowObj: any, text: any) => (moment(text).format('DD/MM/YYYY')),
        }];

    const handleShow = () => setShow(true);
    const handleClose = () => {
        setShow(false);
        setReadOnlyFlag(false);
        setcurrentSiteInventory({} as ISiteInventoryTypes);
        allSiteInventory(currentPage, SiteId);
    };
    const editSiteInventory = (obj: ISiteInventoryTypes) => {
        setcurrentSiteInventory(obj);
        handleShow();
    };
    return (
        <>
            <Container fluid>
                <Row className="add-buttton-row">
                    <Col>
                        <h3 className="float-left">Materials</h3>

                        <Button variant="outline-primary" size="sm" className="float-right" onClick={handleShow}>Add Material</Button>
                    </Col>
                </Row>
                <Row>
                    <Col md lg="8"></Col>
                    <Col></Col>
                    <Col md={'auto'}><h5 className="float-left" style={{ paddingTop: "5px" }}>Select Site</h5></Col>
                    <Col md={2} style={{paddingBottom:"5px"}}>
                        <AsyncSelect value={selectedSite} onInputChange={allSites} defaultOptions={allSite} loadOptions={loadOptions} onChange={(val) => { setsiteId(val) }}></AsyncSelect>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {(listData.length === 0) ? <p>Records Not Found</p> : <Fragment><Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    {tableObject.map(columnObj => (
                                        <th key={columnObj.columnName}>
                                            {columnObj.columnName}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {listData.map((rowObj: any) => (
                                    <tr key={rowObj._id}>
                                        {tableObject.map((columnObj, index) =>
                                        (<td key={columnObj.columnName}>
                                            {columnObj.view(rowObj, rowObj[columnObj.key])}
                                            {tableObject.length - 1 === index &&
                                                <Fragment>
                                                    <Button variant="link" className="float-right" onClick={() => { editSiteInventory(rowObj) }}>Edit</Button>
                                                </Fragment>
                                            }
                                        </td>)
                                        )}
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                            <PaginationComponent totalPages={totalPage} changePage={allSiteInventory}></PaginationComponent>
                        </Fragment>
                        }
                    </Col>
                </Row>
            </Container>
            <ModalComponent handleShow={handleShow} handleClose={handleClose} show={show} size="xl">
                <SiteInventoryForms handleClose={handleClose} currentSiteInventory={currentSiteInventory} isReadOnly={isReadOnly}></SiteInventoryForms>
            </ModalComponent>
        </>
    );
};