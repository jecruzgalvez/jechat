import * as React from "react";
import { connect } from "react-redux";
import { getContactsList } from "../actions/index";
import { bindActionCreators } from "redux";

interface ContactsListProps {
  contacts: {_id: string, userName: string}[];
  getContactsList: any;
}

class ContactsList extends React.Component <ContactsListProps, {}> {

  componentDidMount() {
    let friendsNames:  {_id: string, userName: string}[] = [];

    let url = '/getContactsList';
    let data = {
      email: 'e@gmail.com'
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(res => {
      if (res.response === 'success') {
        Object.assign(friendsNames, res.friends['friends']);
      }
    })
    .then( () => {
      this.props.getContactsList(friendsNames);
    })
  }

  renderList() {   
    return this.props.contacts.map((contact ) => {
      // debugger
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
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state: any) {  
  return {
    contacts: state.contacts
  };
}

// Anything returned from this function will end up as props
// on the ContactsList container
function mapDispatchToProps(dispatch: any) {
//   // Whenever selectBook is called, the result shoudl be passed
//   // to all of our reducers
  return bindActionCreators({ getContactsList: getContactsList }, dispatch);
}

// Promote ContactsList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
