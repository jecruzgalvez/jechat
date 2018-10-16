import * as React from 'react';

import Sidebar from './Sidebar';
import Chat from '../containers/Chat';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';

import {InjectedIntl} from 'react-intl';


class Dashboard extends React.Component {
  intl: InjectedIntl;    
  render() {
    return (
      
      <Grid>
        <Row className="show-grid">
          <Col md={5}>
            <Sidebar />
          </Col>
          <Col md={7}>
            <Chat intl={this.intl} />
          </Col>
        </Row>
      </Grid>
      
    );
  }
}

export default Dashboard;