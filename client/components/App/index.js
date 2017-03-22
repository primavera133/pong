import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import LimitUser from '../LimitUser';
import Alert from '../Alert';

export class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <LimitUser scope="*">
          <div>
            <LimitUser scope={['admin']}>
              <p>ADMIN!</p>
            </LimitUser>
          </div>
        </LimitUser>
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
