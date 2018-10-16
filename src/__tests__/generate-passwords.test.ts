// jest.dontMock('../generate-password.js')
import generatePassword from '../generate-password';

describe('method generatePassword', ()=>{
  let password;
  it('returns a generated password of lower-case characters and numbers with the length of 8', (done)=>{
    password = generatePassword();    
    expect(password).toMatch(/^[a-z0-9]{8}$/);
    done();
  });
});