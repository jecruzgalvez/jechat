import * as React from "react";
import { connect } from "react-redux";
import { fetchContactsList } from "../actions/index";

import { ListGroup, ListGroupItem } from 'react-bootstrap';

interface ContactsListProps {
  contacts: {_id: string, userName: string}[];
  fetchContactsList: any;
}

class ContactsList extends React.Component <ContactsListProps, {}> {
  constructor(props: ContactsListProps) {
    super(props);

    this.handleClickListGroup = this.handleClickListGroup.bind(this);
  }


  componentDidMount() {
    this.props.fetchContactsList();
  }

  handleClickListGroup(event: React.MouseEvent <ListGroupItem & HTMLLIElement>) {
    console.log(event.currentTarget.dataset.id);    

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
    return (
      <ListGroup>
          {this.renderList()}
      </ListGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
