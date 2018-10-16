import * as React from 'react';
import { FormattedMessage } from 'react-intl';

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
            <Modal.Title>
              <FormattedMessage
                id="newGroup.selectFriendsForNewGroup"
                defaultMessage="Select the friends to create a new group"
              />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
          <ul>
            List of friends to add to the group
          </ul>            
          </Modal.Body>

          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={this.props.handleToggleModalNewGroup}
            >
              <FormattedMessage
                id="newGroup.cancel"
                defaultMessage="Cancel"
              />
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default NewGroup;