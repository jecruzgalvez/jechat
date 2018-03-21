import * as React from 'react';
// import { Redirect } from 'react-router';

import { Modal, Button } from 'react-bootstrap';

interface NewGroupProps {
  handleToggleModalSearchContacts: () => void;
}

class NewGroup extends React.Component <NewGroupProps, {}> {
  render() {
    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Search for new contacts</Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <ul>
            Search for new contacts
          </ul>            
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

export default NewGroup;