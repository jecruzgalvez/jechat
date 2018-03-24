import * as React from 'react';
// import { Redirect } from 'react-router';

import SearchContacts from './SearchContacts';
import NewGroup from './NewGroup';
import ContactsOrder from './ContactsOrder';
import ContactsList from '../containers/ContactsList';

import { Button, ButtonGroup, Jumbotron } from 'react-bootstrap';

interface SidebarSatate {
  showModalSearchContacts: boolean;
  showModalNewGroup: boolean;
}

class Sidebar extends React.Component <{}, SidebarSatate> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showModalSearchContacts: false,
      showModalNewGroup: false
    };

    this.handleToggleModalSearchContacts = this.handleToggleModalSearchContacts.bind(this);
    this.handleToggleModalNewGroup = this.handleToggleModalNewGroup.bind(this);
  }

  handleToggleModalSearchContacts() {
    this.setState({
      showModalSearchContacts: !this.state.showModalSearchContacts
    });
  }

  handleToggleModalNewGroup() {
    this.setState({
      showModalNewGroup: !this.state.showModalNewGroup
    });
  }

  render() {
    return (
      <Jumbotron className="w-100 h-100">
      
        <ButtonGroup>
          <Button bsStyle="primary" onClick={this.handleToggleModalSearchContacts}> Search contacts </Button>
          <Button bsStyle="primary" onClick={this.handleToggleModalNewGroup}> New group </Button>
        </ButtonGroup>
        {this.state.showModalSearchContacts ? <SearchContacts handleToggleModalSearchContacts ={this.handleToggleModalSearchContacts} /> : <div /> }        
        {this.state.showModalNewGroup ? <NewGroup handleToggleModalNewGroup={this.handleToggleModalNewGroup} /> : <div /> }

        <ContactsOrder />
        <ContactsList />

      </Jumbotron>
    );
  }
}

export default Sidebar;