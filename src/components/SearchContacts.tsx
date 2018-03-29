import * as React from 'react';
import { connect } from "react-redux";
import { fetchContactsList } from "../actions/index";

import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

interface NewGroupProps {
  handleToggleModalSearchContacts: () => void;
  contacts: {_id: string, userName: string}[];
  fetchContactsList: any;
}

class NewGroup extends React.Component <NewGroupProps, {}> {
  constructor(props: NewGroupProps) {
    super(props);

    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }


  componentDidMount() {
    this.props.fetchContactsList();
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    console.log(event.currentTarget.dataset.id);


    this.props.handleToggleModalSearchContacts();
  }

  renderList() {
    return this.props.contacts.map((contact ) => {
      return (
        <ListGroupItem key={contact._id} onClick={this.handleClickListGroup} data-id={contact._id}>
          {contact.userName}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return(
      <div className="static-modal">
        <Modal.Dialog>

          <Modal.Header>
            <Modal.Title>Click on a user to add to your contacts list.</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ListGroup>
                {this.renderList()}
            </ListGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={this.props.handleToggleModalSearchContacts}
            >
              Cancel
            </Button>
          </Modal.Footer>

        </Modal.Dialog>
      </div>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    contacts: state.contacts
  };
}

function mapDispatchToProps(dispatch: any) {
// Whenever a function is called, the result shoudl be passed to all of our reducers
  // return bindActionCreators({
  //   fetchContactsList: fetchContactsList
  // }, dispatch);
  return {
    fetchContactsList: () => dispatch(fetchContactsList())
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);
