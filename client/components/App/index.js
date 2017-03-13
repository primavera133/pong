import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Alert from '../Alert';

export class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        {this.props.children}
        <Alert/>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.object
}

export default connect()(App)
