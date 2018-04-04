import * as React from 'react';
import { connect } from "react-redux";
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { fetchFriends, newConversation } from "../actions/index";

interface OneToOneProps {
  handleToggleModalOneToOne: () => void;
  friends: {_id: string, firstName: string}[];
  fetchContacts: any;
  newConversation: any;
}

class OneToOne extends React.Component <OneToOneProps, {}> {
  constructor(props: OneToOneProps) {
    super(props);

    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }


  componentDidMount() {
    this.props.fetchContacts();
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    console.log(event.currentTarget.dataset.id);
    // debugger;    
    this.props.newConversation(event.currentTarget.dataset.id, event.currentTarget.dataset.firstname);
    this.props.handleToggleModalOneToOne();
  }

  renderList() {
    return this.props.friends.map((friend ) => {
      return (
        <ListGroupItem key={friend._id} onClick={this.handleClickListGroup} data-id={friend._id} data-firstname={friend.firstName} >
          {friend.firstName} ---- {friend._id}
        </ListGroupItem>        
      );
    });
  }

  render() {
    return(
      <div className="static-modal">
        <Modal.Dialog>

          <Modal.Header>
            <Modal.Title>Click on a user to add to your friends list.</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ListGroup>
                {this.renderList()}
            </ListGroup>
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={this.props.handleToggleModalOneToOne}
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
    friends: state.friends
  };
}

function mapDispatchToProps(dispatch: any) {
// Whenever a function is called, the result shoudl be passed to all of our reducers
  // return bindActionCreators({
  //   fetchContactsList: fetchContactsList
  // }, dispatch);
  return {
    fetchContacts: () => dispatch(fetchFriends()),
    newConversation: (recipient: any) => dispatch(newConversation(recipient))
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(OneToOne);