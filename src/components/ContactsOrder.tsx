import * as React from 'react';
import FilterLink from './FilterLink';
// import { Glyphicon } from 'react-bootstrap';

class ContactsOrder extends React.Component {
  render() {
    return (
      <div>
        {" ("}
        <FilterLink filter="ASCENDING">
          Ascending
        </FilterLink>
        {" / "}
        <FilterLink filter="DESCENDING">
          Descenging
        </FilterLink>
        {" )"}
      </div>
    );
  }
}

export default ContactsOrder;