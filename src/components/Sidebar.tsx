import * as React from 'react';
import { Button, ButtonGroup, Jumbotron } from 'react-bootstrap';

import OneToOne from '../containers/OneToOne';
import NewGroup from './NewGroup';
import ContactsOrder from './ContactsOrder';
import Conversations from '../containers/Conversations';

interface SidebarSatate {
  showModalOneToOne: boolean;
  showModalNewGroup: boolean;
}

class Sidebar extends React.Component <{}, SidebarSatate> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showModalOneToOne: false,
      showModalNewGroup: false
    };

    this.handleToggleModalOneToOne = this.handleToggleModalOneToOne.bind(this);
    this.handleToggleModalNewGroup = this.handleToggleModalNewGroup.bind(this);
  }

  handleToggleModalOneToOne() {
    this.setState({
      showModalOneToOne: !this.state.showModalOneToOne
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
          <Button bsStyle="primary" onClick={this.handleToggleModalOneToOne}> One to One </Button>
          <Button bsStyle="primary" onClick={this.handleToggleModalNewGroup}> New group </Button>
        </ButtonGroup>
        {this.state.showModalOneToOne ? <OneToOne handleToggleModalOneToOne ={this.handleToggleModalOneToOne} /> : <div /> }        
        {this.state.showModalNewGroup ? <NewGroup handleToggleModalNewGroup={this.handleToggleModalNewGroup} /> : <div /> }

        <ContactsOrder />
        <Conversations />

      </Jumbotron>
    );
  }
}

export default Sidebar;