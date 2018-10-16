import fetchUsers from '../../actions/actionUsers_fetchUsers';

describe('fetchUsers()', () => {
  
  it('fetchUsers() not null', (done) => {
    expect(fetchUsers()).not.toBeNull;
    done();
  });

  // console.log(fetchUsers().toString());
  // return fetchUsers()(dispatchEvent).then( 
  //   success => {
  //     console.log('success========> ',success)
  //     // debugger;      
  //   },
  //   error => {
  //     console.log('error==========> ',error)
  //   }
  // )
});