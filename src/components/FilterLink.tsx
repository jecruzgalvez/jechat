import * as  React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { setVisibilityFilter } from '../actions';

interface SFCLinkProps extends DispatchProp <{}> {
  active: string;  
  onClick: () => void;
}

const Link : React.SFC <SFCLinkProps> =  ( { active, children, onClick } ) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

interface MapStateToProps {
  (state:any, ownProps: {filter: string} ): any;
}

const mapStateToProps : MapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

interface MapDispatchToProps {
  (dispatch: any, ownProps: any): any;
}

const mapDispatchToProps : MapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink;
