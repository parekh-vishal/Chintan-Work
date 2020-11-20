import React, { Fragment } from "react";
import { Button, Modal } from "react-bootstrap";
import './modal.component.scss'

export const ModalComponent = (props: any) => {

  return (
    <>
      <Modal
        show={props.show}
        size="lg"
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
        { props.headerName ? 
          <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>{props.headerName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.children}
            </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={props.handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={props.handleCreate}>Create</Button>
                </Modal.Footer>
          </Fragment>
          : props.children
        }
      </Modal>

    </>
  );
};