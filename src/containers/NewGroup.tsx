import * as React from 'react';
// import { Redirect } from 'react-router';

import { Modal, Button } from 'react-bootstrap';

interface NewGroupProps {
  handleToggleModalNewGroup: () => void;
}

class NewGroup extends React.Component <NewGroupProps, {}> {
  render() {
    return(
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>New group </Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <ul>
            List of contacts to add to the group
          </ul>            
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={this.props.handleToggleModalNewGroup}
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