import * as React from 'react';
import { Button, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

import OneToOne      from '../containers/OneToOne';
import NewFriend     from '../containers/NewFriend';
import NewGroup      from '../containers/NewGroup';
import Conversations from '../containers/Conversations';

interface SidebarSatate {
  showModalNewFriend: boolean;
  showModalOneToOne:  boolean;
  showModalNewGroup:  boolean;
}

class Sidebar extends React.Component <{}, SidebarSatate> {
  constructor(props: {}) {
    super(props);

    this.state = {
      showModalNewFriend: false,
      showModalOneToOne:  false,
      showModalNewGroup:  false
    };

    this.handleToggleModalNewFriend = this.handleToggleModalNewFriend.bind(this);
    this.handleToggleModalOneToOne = this.handleToggleModalOneToOne.bind(this);
    this.handleToggleModalNewGroup = this.handleToggleModalNewGroup.bind(this);
  }

  handleToggleModalNewFriend() {
    this.setState({
      showModalNewFriend: !this.state.showModalNewFriend
    });
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
          <Button bsStyle="primary" onClick={this.handleToggleModalNewFriend}>
            <FormattedMessage
                id="sidebar.newFriend"
                defaultMessage= "New friend"
            />
          </Button>
          <Button bsStyle="primary" onClick={this.handleToggleModalOneToOne}>
            <FormattedMessage
              id="sidebar.oneToOne"
              defaultMessage= "One to one"
            />
          </Button>
          <Button bsStyle="primary" onClick={this.handleToggleModalNewGroup}>
            <FormattedMessage
              id="sidebar.newGroup"
              defaultMessage= "New group"
            />
          </Button>
        </ButtonGroup>
        {this.state.showModalNewFriend ? <NewFriend handleToggleModalNewFriend ={this.handleToggleModalNewFriend} /> : <div /> }        
        {this.state.showModalOneToOne  ? <OneToOne handleToggleModalOneToOne   ={this.handleToggleModalOneToOne}  /> : <div /> }        
        {this.state.showModalNewGroup  ? <NewGroup handleToggleModalNewGroup   ={this.handleToggleModalNewGroup}  /> : <div /> }

        <Conversations />

      </Jumbotron>
    );
  }
}

export default Sidebar;