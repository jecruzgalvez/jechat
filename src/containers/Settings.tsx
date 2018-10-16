import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';

import { Jumbotron, FormGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { selectLanguage } from '../actions';

interface SettingsProps {
  selectLanguage: (language:string) => void;
}

class Settings extends React.Component <SettingsProps & InjectedIntlProps,{}>{
  constructor(props: SettingsProps & InjectedIntlProps) {
    super(props);
    this.handleLanguageEnglish = this.handleLanguageEnglish.bind(this);
    this.handleLanguageSpanish = this.handleLanguageSpanish.bind(this);
  }

  handleLanguageEnglish() {
    this.props.selectLanguage('en');
  }
  handleLanguageSpanish() {
    this.props.selectLanguage('es');
  }


  render() {
  
    let language = this.props.intl.formatMessage({id: "settings.language"});
  
    return (
      <Jumbotron>
          <FormGroup>
            <DropdownButton title={language} id={'dropdown-basic-language'}>
              <MenuItem eventKey="1" onClick={this.handleLanguageEnglish} >
                <FormattedMessage
                  id="settings.english"
                  defaultMessage="English"
                />
              </MenuItem>
              <MenuItem eventKey="2" onClick={this.handleLanguageSpanish} >
              <FormattedMessage
                  id="settings.spanish"
                  defaultMessage="Spanish"
                />
              </MenuItem>
            </DropdownButton>            
          </FormGroup>
      </Jumbotron>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    selectLanguage: (language: string) => dispatch(selectLanguage(language))
  }
}

export default injectIntl(connect(null, mapDispatchToProps)(Settings));
