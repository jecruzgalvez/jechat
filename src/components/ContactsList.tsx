import * as React from 'react';

interface ContactsListState {
  friends: string[];
}

class ContactsList extends React.Component <{}, ContactsListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      friends: []
    }
  }
  
  componentDidMount() {
    let url = '/getContactsList';
    let data = {
      email: 'e@gmail.com'
      // password: 'eee'
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(res => {
      if (res.response === 'success') {
        let friendsNames: string[] = [];
        // console.log(res.friends['friends']);
        res.friends['friends'].map((f: {userName: string}) => {
          friendsNames.push(f.userName);          
        })

        this.setState({friends: friendsNames});
        console.log(this.state.friends);

      } else {
        console.log(res.friends)
      }          
    });
  }
  render() {
    return(
      <div>
        <ul>
          {this.state.friends.map( (friend: {}) => 
            <li>
              {friend}
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default ContactsList;