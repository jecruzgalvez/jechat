import * as React from 'react';
import { connect } from "react-redux";

interface HeaderProps {
  conversations: any;
}

class Header extends React.Component <HeaderProps, {}> {
  constructor(props: HeaderProps){
    super(props);
  }
  render() {
  return (
    <div>
      <h1>
        JEChat: {this.props.conversations.currentConversation}
      </h1>
      <hr/>
    </div>    
  );
  }
}

function mapStateToProps(state: any) {  
  return {
    conversations: state.conversations
  };
}

export default connect(mapStateToProps)(Header);
