import * as React from 'react';

import Sidebar from './Sidebar';
import Chat from './Chat';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';

class Dashboard extends React.Component {
  render() {
    return (
      
      <Grid>
        <Row className="show-grid">
          <Col md={4}>
            <Sidebar />
          </Col>
          <Col md={8}>
            <Chat />
          </Col>
        </Row>

      </Grid>
      
    );
  }
}

export default Dashboard;