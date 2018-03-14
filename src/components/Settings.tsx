import * as React from 'react';

import { Jumbotron, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Settings extends React.Component {
  constructor(props: {}) {
    super(props);
  }
   
  render() {
    return (
      <Jumbotron>
        <form>
          <FormGroup controlId="formValidationError1" validationState="error">
            <ControlLabel>Input with error</ControlLabel>
            <FormControl type="text" />
          </FormGroup>
        </form>
      </Jumbotron>
    );
  }
}

export default Settings;