import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {getGameState} from '../../actions/game'

export class DwarfMatch extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    const whosTurn = this.props.match[this.props.match.turn]
    console.log('turn', whosTurn.playerId)
    this.props.dispatch(getGameState(this.props.match.game.gameId, whosTurn.playerId))
  }

  render () {
    return (
      <div>
        <h1>{this.props.match.game.name}</h1>
        <h2>{this.props.match.playerOne.name} vs {this.props.match.playerTwo.name}</h2>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(DwarfMatch)
