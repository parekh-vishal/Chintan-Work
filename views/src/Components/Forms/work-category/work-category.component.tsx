import React from "react";
import { Button, Col, FormControl, Modal, Row } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { addWorkCategory, getAllWorkCategory } from "../../../services";
import './work-category.component.scss'

interface IWorkCategory {
  WorkTypes: string;
  workId: string;
}

interface IState {
  newWorkCategory: string;
  allCategory: Array<IWorkCategory>;
}


export class WorkCategory extends React.PureComponent<any, IState> {

  public constructor(props: any) {
    super(props);

    this.state = {
      newWorkCategory: "",
      allCategory: [] as Array<IWorkCategory>
    };
  }

  componentDidMount =  async() => {
    this.fetchAllWorkCategory();
  }

  fetchAllWorkCategory = async () => {
    var respond = await getAllWorkCategory();
    console.log(respond.data);
    if (respond.data) {
      this.setState({
        allCategory: respond.data
      });
    }
  }
  
  handleSubmit = async () => {
    const {newWorkCategory} = this.state;
    console.log(newWorkCategory)
    if(newWorkCategory){
      const body = {WorkTypes: newWorkCategory}
      const respond = await addWorkCategory(body);
      if(respond.data){
        console.log(respond.data);
        this.setState({
          newWorkCategory: ""
        });
        this.fetchAllWorkCategory();
        alert("Work category Added.")
      }
    }else{
      alert("Please add text in field.")
    }
  }

 

  updateNewWorkCategory = (event: any) => {
    this.setState({
      newWorkCategory: event.target.value
    });
  }


  public render() {
    const {newWorkCategory, allCategory} = this.state;
    return <>
        <Modal.Header closeButton>
          <Modal.Title>Work Category</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        
          <Row>
            <Col xs={10}>
              <FormControl placeholder="Enter new Work Category" value={newWorkCategory} onChange={this.updateNewWorkCategory}/>
            </Col>
            <Col>
              <Button variant="primary" onClick={this.handleSubmit}>Add</Button>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

          {allCategory.map((rowObj: IWorkCategory) => (
            <Row key={rowObj.workId}>
              <Col>
                {rowObj.WorkTypes}
              </Col>
            </Row>
          ))}

        </Modal.Body>
        
      </>
    ;
  }
};
