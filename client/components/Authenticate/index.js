import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../actions/auth.js'

export class Authenticate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: null,
      password: null
    }
  }

  handleSubmit (event) {
    event.preventDefault()

    this.props.dispatch(signIn(this.state, '/list'))
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label htmlFor='email'>E-mail</label>
        <input
          id='email'
          type='text'
          onChange={e => this.setState({email: e.target.value})} />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='text'
          onChange={e => this.setState({password: e.target.value})} />

        <button type='submit'>Submit</button>
      </form>
    )
  }
}

Authenticate.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(Authenticate)
