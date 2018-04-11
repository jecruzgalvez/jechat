import * as React from 'react';
import { connect } from "react-redux";
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

import { fetchUsers, newFriend } from "../actions/index";

interface NewFriendProps {
  users: {_id: string, firstName: string}[];
  fetchUsers: () => void;
  handleToggleModalNewFriend: () => void;
  newFriend: any;
}

class NewFriend extends React.Component <NewFriendProps, {}> {
  constructor(props: NewFriendProps) {
    super(props);
    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    console.log(event.currentTarget.dataset.id);
    // debugger;    
    this.props.newFriend(event.currentTarget.dataset.id);
    this.props.handleToggleModalNewFriend();
  }

  renderList() {
    return this.props.users.map((user ) => {
      return (
        <ListGroupItem key={user._id} onClick={this.handleClickListGroup} data-id={user._id} data-firstname={user.firstName} >
          {user.firstName}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return(
      <div className="static-modal">
        <Modal.Dialog>

          <Modal.Header>
            <Modal.Title>Click on a user to make him/her your friend.</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ListGroup>
                {this.renderList()}
            </ListGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={this.props.handleToggleModalNewFriend}
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
    users: state.users
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    newFriend: (newFriendId: any) => dispatch(newFriend(newFriendId))
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(NewFriend);