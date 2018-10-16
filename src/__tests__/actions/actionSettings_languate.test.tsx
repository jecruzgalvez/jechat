import selectLanguage, {SELECT_LANGUAGE} from '../../actions/actionSettings_selectLanguage';

describe('language reducer', () => {

  it('empty string', (done) => {
    expect(selectLanguage('')).toEqual({
      type: 
      SELECT_LANGUAGE,
      language: ''
    });
    done();
  });

  it('english', (done) => {
    expect(selectLanguage('en')).toEqual({
      type: 
      SELECT_LANGUAGE,
      language: 'en'
    });
    done();
  });

  it('spanish', (done) => {
    expect(selectLanguage('es')).toEqual({
      type: 
      SELECT_LANGUAGE,
      language: 'es'
    });
    done();
  });

});