import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'

export class MatchList extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onMatchClick(this.props.match)
  }

  render() {
    const {match, disabled} = this.props
    return (
      <li key={match._id}>
        {(() => {
          if (disabled) {
            return <span>{match.game.name}: {match.playerOne.name} vs {match.playerTwo.name}</span>
          } else if (match.rejected) {
            return <s>{match.game.name}: {match.playerOne.name} vs {match.playerTwo.name}</s>
          } else {
            return <a onClick={this.handleClick}>
              {match.game.name}: {match.playerOne.name} vs {match.playerTwo.name}
            </a>
          }
        })()}
      </li>
    )
  }
}

export default MatchList
