import * as React from 'react';
// import { Redirect } from 'react-router';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Jumbotron } from 'react-bootstrap';

interface SidebarSatate {
  clickedContacts: boolean;
  contactsAscending: boolean;
}

class Sidebar extends React.Component <{}, SidebarSatate> {
  constructor(props: {}) {
    super(props);

    this.state = {
      clickedContacts: false,
      contactsAscending: true
    }

    this.handleClickNewGroup = this.handleClickNewGroup.bind(this);
    this.handleClickCancelNewGroup = this.handleClickCancelNewGroup.bind(this);
    this.handleClickSortContacts = this.handleClickSortContacts.bind(this);

    
  }

  handleClickNewGroup() {
    this.setState({
      clickedContacts: true
    })    
  }

  handleClickCancelNewGroup() {
    this.setState({
      clickedContacts: false
    })    
  }

  handleClickSortContacts() {
  if( this.state.contactsAscending )
    this.setState({
      contactsAscending: false
    })
  else
    this.setState({
      contactsAscending: true
    })
  }
  
  render() {
    if (this.state.clickedContacts) {
      return(
        <div className="static-modal">
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>New group </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <ul>
          
            </ul>            
            </Modal.Body>

            <Modal.Footer>
              <Button
                bsStyle="primary"
                onClick={this.handleClickCancelNewGroup}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )
    }

    return (
      <Jumbotron>
        <Button bsStyle="primary" onClick={this.handleClickNewGroup}>
          New group
        </Button>
        <hr/>
        <Button bsStyle="primary" onClick={this.handleClickSortContacts}>
          {this.state.contactsAscending ? "Contacts ascending" : "Contacts descending"}
        </Button>
        <ul>
          <li>Contact 1</li>
          <li>Contact 2</li>
          <li>Contact 3</li>
          <li>Contact 4</li>
          <li>Contact 5</li>
          <li>Contact 6</li>
          <li>Contact 7</li>
          <li>Contact 8</li>
          <li>Contact 9</li>
          <li>Contact 10</li>
        </ul>
      </Jumbotron>
    )
  }
}

export default Sidebar;