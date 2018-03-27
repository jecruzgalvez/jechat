import * as React from "react";
import { connect } from "react-redux";
import { fetchContactsList } from "../actions/index";
import { bindActionCreators } from "redux";

// import { RootState } from '@src/redux';

interface ContactsListProps {
  contacts: {_id: string, userName: string}[];
  fetchContactsList: any;
}

class ContactsList extends React.Component <ContactsListProps, {}> {

  componentDidMount() {
    this.props.fetchContactsList();
  }

  renderList() {
    return this.props.contacts.map((contact ) => {
      return (
        <li
          key={contact._id}
          className="list-group-item"
        >
          UserName:
           {contact.userName}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>    
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
  return bindActionCreators({
    fetchContactsList: fetchContactsList
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
