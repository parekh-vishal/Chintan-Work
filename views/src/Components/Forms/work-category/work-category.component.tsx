import React from "react";
import { Button, Col, FormControl, Modal, Row, Table } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { addWorkCategory, editWorkCategory, getAllWorkCategory } from "../../../services";
import './work-category.component.scss'

interface IWorkCategory {
  WorkTypes: string;
  workId: string;
}

interface IState {
  newWorkCategory: string;
  allCategory: Array<IWorkCategory>;
  editCategory: IWorkCategory;
}


export class WorkCategory extends React.PureComponent<any, IState> {

  public constructor(props: any) {
    super(props);

    this.state = {
      newWorkCategory: "",
      allCategory: [] as Array<IWorkCategory>,
      editCategory: {} as IWorkCategory
    };
  }

  componentDidMount =  async() => {
    this.fetchAllWorkCategory();
  }

  fetchAllWorkCategory = async () => {
    var respond = await getAllWorkCategory();
    if (respond.data) {
      this.setState({
        allCategory: respond.data
      });
    }
  }
  
  handleSubmit = async () => {
    const {newWorkCategory, editCategory} = this.state;
    if(newWorkCategory){
      const body = {WorkTypes: newWorkCategory}
      const respond = await (editCategory.workId ? editWorkCategory({body, workId:editCategory.workId }) : addWorkCategory(body));
      if(respond && respond.data){
        alert(respond.data.message)
        this.setState({
          newWorkCategory: "",
          editCategory: {} as IWorkCategory
        });
        this.fetchAllWorkCategory();
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

  editWorkCategory = (obj: IWorkCategory) => {
    this.setState({
      editCategory: obj,
      newWorkCategory: obj.WorkTypes
    });
  }


  public render() {
    const {newWorkCategory, allCategory, editCategory} = this.state;
    return <>
        <Modal.Header closeButton>
          <Modal.Title>Work Category</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>

          {editCategory.workId && <Row>
            <Col>
              {`Edit Work Category: ${editCategory.WorkTypes}`}
            </Col>
          </Row>}
        
          <Row>
            <Col xs={10}>
              <FormControl placeholder="Enter new Work Category" value={newWorkCategory} onChange={this.updateNewWorkCategory}/>
            </Col>
            <Col>
              <Button variant="primary" onClick={this.handleSubmit}>{editCategory.workId ? 'Save' : 'Add'}</Button>
            </Col>
          </Row>
          
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>

            <Row>
              <Col>
                <Table striped bordered hover size="sm">
                  <tbody>
                    {allCategory.map((rowObj: IWorkCategory) => (
                      <tr key={rowObj.workId}>
                        <td>
                          {rowObj.WorkTypes}
                          <Button variant="link" className="float-right" onClick={this.editWorkCategory.bind(this,rowObj)}>Edit</Button>
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </Table>
                
              </Col>
            </Row>

        </Modal.Body>
        
      </>
    ;
  }
};
