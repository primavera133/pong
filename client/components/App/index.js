import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import TopNav from './TopNav'
import {Row, Col} from 'react-bootstrap'
import Alert from '../Alert'

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="app">
        <TopNav />

        <div className="container">
          <Row>
            <Col md={4} mdOffset={4}>
              {this.props.children}
            </Col>
          </Row>
        </div>
        <Alert/>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default connect()(App)
