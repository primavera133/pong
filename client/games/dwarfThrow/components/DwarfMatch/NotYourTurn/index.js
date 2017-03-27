import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export class NotYourTurn extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {match, auth} = this.props

    return (
      <div>
        <p>NOT YOUR TURN</p>
        <Link to="/matches">Till de andra matcherna</Link>
      </div>
    )
  }
}


export default NotYourTurn
