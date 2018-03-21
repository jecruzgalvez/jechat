import * as  React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { setVisibilityFilter } from '../actions';


interface OnClickInterface {
  () :void ;
}

interface LinkInterface extends DispatchProp <{}> {
  active: boolean;
  onClick: OnClickInterface;
}

const Link : React.SFC <LinkInterface>  =  ( { active, children, onClick } ) => {
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
  (state: {visibilityFilter: string}, ownProps: {filter: string} ) : any ;
}

const mapStateToProps : MapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter
})

interface MapDispatchToPropsInterface {
  (dispatch: any, ownProps: {filter: string}): any;
}

const mapDispatchToProps : MapDispatchToPropsInterface = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setVisibilityFilter(ownProps.filter))
  }
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
