import * as React from 'react';
import FilterLink from './FilterLink';

// import { Glyphicon } from 'react-bootstrap';

class ContactsOrder extends React.Component {
  render() {
    return (
      <div>
        {/* <Button bsStyle="primary" onClick={this.handleClickSortContacts}>        
          {'Contacts '}
          {this.state.contactsAscending ? 
            <Glyphicon glyph="glyphicon glyphicon-sort-by-alphabet" />
            :
            <Glyphicon glyph="glyphicon glyphicon-sort-by-alphabet-alt" />
            }
        </Button> */}

        Contacts {" ("}
        <FilterLink filter="ASCENDING">
          ascending
        </FilterLink>
        {" / "}
        <FilterLink filter="DESCENDING">
          descenging
        </FilterLink>
        {" )"}
      </div>
    );
  }
}

export default ContactsOrder;