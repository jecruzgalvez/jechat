import * as React from 'react';
import FilterLink from './FilterLink';

class About extends React.Component {
  render() {
    return (
      <div>
        Contacts order:
        {" "}
        <FilterLink filter="SHOW_ALL">
          Ascending
        </FilterLink>
        {", "}
        <FilterLink filter="SHOW_ACTIVE">
          Descending
        </FilterLink>
        {/* {", "}
        <FilterLink filter="SHOW_COMPLETED">
          Completed
        </FilterLink> */}
      </div>
    );
  }
}

export default About;